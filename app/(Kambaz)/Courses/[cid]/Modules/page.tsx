'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation'; 
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import ModulesControls from './ModulesControls'; 
import ModuleControlButtons from './ModuleControlButtons';
import LessonControlButtons from './LessonControlButtons';
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer"; 
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../client";
import type { Module, Lesson } from "./reducer"; // Import types from reducer

interface User {
  _id: string;
  role: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface RootState {
  modulesReducer: {
    modules: Module[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string; 
  
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  // Check if user is Faculty or Admin (not Student)
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchModules = useCallback(async () => {
    const courseId = Array.isArray(cid) ? cid[0] : cid;
    if (!courseId) return;
    try {
      const modules = await client.findModulesForCourse(courseId);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [cid, dispatch]);

  const onUpdateModule = async (module: Module) => {
    if (!isFacultyOrAdmin) {
      console.warn("Students cannot update modules");
      return;
    }
    await client.updateModule(cid as string, module);
    const newModules = modules.map((m: Module) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  const onRemoveModule = async (moduleId: string) => {
    if (!isFacultyOrAdmin) {
      console.warn("Students cannot delete modules");
      return;
    }
    try {
      await client.deleteModule(cid, moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const onCreateModuleForCourse = async () => {
    if (!isFacultyOrAdmin) {
      console.warn("Students cannot create modules");
      return;
    }
    
    const courseId = Array.isArray(cid) ? cid[0] : cid; 
    if (!courseId) {
      console.error("No course ID found");
      return;
    }
    if (!moduleName.trim()) {
      console.error("Module name is empty");
      return;
    }

    try {
      console.log("Creating module:", { name: moduleName, course: courseId });
      const newModule = { name: moduleName, course: courseId };
      const createdModule = await client.createModuleForCourse(courseId, newModule);
      console.log("Module created:", createdModule);
      dispatch(setModules([...modules, createdModule]));
      setModuleName(""); 
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);
  
  const courseModules = modules; 

  return (
    <div className="wd-modules">
      {/* Only show ModulesControls for Faculty/Admin */}
      {isFacultyOrAdmin && (
        <>
          <ModulesControls 
            moduleName={moduleName} 
            setModuleName={setModuleName}
            addModule={onCreateModuleForCourse} 
          />
          <br/><br/><br/><br/><br/>
        </>
      )}
      
      {/* Show info message for students */}
      {!isFacultyOrAdmin && (
        <div className="alert alert-info">
          You are viewing this course as a student. Module management is restricted to faculty and administrators.
        </div>
      )}
      
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((moduleItem) => ( 
          <ListGroupItem 
            key={moduleItem._id} 
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!moduleItem.editing && moduleItem.name}
              {moduleItem.editing && isFacultyOrAdmin && (
                <FormControl 
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(
                      updateModule({ ...moduleItem, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...moduleItem, editing: false });
                    }
                  }}
                  defaultValue={moduleItem.name}
                />
              )}
              {/* Only show control buttons for Faculty/Admin */}
              {isFacultyOrAdmin && (
                <ModuleControlButtons 
                  moduleId={moduleItem._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>
            
            <ListGroup className="wd-lessons rounded-0">
              {moduleItem.lessons?.map((lesson) => (
                <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                  {/* Only show lesson control buttons for Faculty/Admin */}
                  {isFacultyOrAdmin && <LessonControlButtons />}
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        ))}
        {courseModules.length === 0 && (
          <ListGroupItem className="text-center p-5 text-muted">
            No modules available for this course.
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}