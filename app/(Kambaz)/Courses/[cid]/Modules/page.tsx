'use client'

import React from 'react';
import { useParams } from 'next/navigation'; 
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import ModulesControls from './ModulesControls'; 
import ModuleControlButtons from './ModuleControlButtons';
import LessonControlButtons from './LessonControlButtons';

import modules from "../../../Database/modules.json";

export default function Modules() {
  const { cid } = useParams();
  const courseModules = modules.filter((module) => module.course === cid);

  return (
    <div>
      <ModulesControls /><br/><br/><br/><br/><br/>
      
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((module) => (
          <ListGroupItem 
            key={module._id} 
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
            </div>
            
            
            <ListGroup className="wd-lessons rounded-0">
              {module.lessons.map((lesson) => (
                <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        ))}
        {courseModules.length === 0 && (
          <ListGroupItem className="text-center p-5 text-muted">No modules available for this course.</ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}