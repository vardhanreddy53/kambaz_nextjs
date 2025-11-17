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

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
}

interface RootState {
  modulesReducer: {
    modules: Module[];
  };
}

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string | string[] | undefined; 
  
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

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
    try {
      await client.updateModule(module);
      dispatch(updateModule({ ...module, editing: false }));
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const onCreateModuleForCourse = async () => {
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
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse} 
      />
      <br/><br/><br/><br/><br/>
      
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((moduleItem) => ( 
          <ListGroupItem 
            key={moduleItem._id} 
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!moduleItem.editing && moduleItem.name}
              {moduleItem.editing && (
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
              <ModuleControlButtons 
                moduleId={moduleItem._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            
            <ListGroup className="wd-lessons rounded-0">
              {moduleItem.lessons?.map((lesson) => (
                <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
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