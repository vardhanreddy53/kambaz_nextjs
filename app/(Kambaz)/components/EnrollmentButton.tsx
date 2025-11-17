"use client";
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, removeEnrollment } from '../Enrollments/reducer';
import * as client from '../Courses/client';

interface EnrollmentButtonProps {
    courseId: string;
}

interface User {
  _id: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
  enrollmentsReducer: {
    enrollments: Enrollment[];
  };
}

export default function EnrollmentButton({ courseId }: EnrollmentButtonProps) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const currentUserId = currentUser?._id || "123"; 
    const [loading, setLoading] = useState(false);
    
    const isEnrolled = enrollments.some((e: Enrollment) => e.course === courseId && e.user === currentUserId);

    const handleEnroll = async () => {
        if (loading || !currentUserId) return;

        try {
            setLoading(true);
            const newEnrollment = await client.enrollInCourse(currentUserId, courseId);
            dispatch(addEnrollment(newEnrollment));
        } catch (error) {
            console.error("Error enrolling in course:", error);
            window.alert("Failed to enroll in the course."); 
        } finally {
            setLoading(false);
        }
    };

    const handleUnenroll = async () => {
        if (loading || !currentUserId) return;

        if (!window.confirm("Are you sure you want to unenroll from this course?")) {
            return;
        }

        try {
            setLoading(true);
            await client.unenrollFromCourse(currentUserId, courseId);
            dispatch(removeEnrollment(courseId));
        } catch (error) {
            console.error("Error unenrolling from course:", error);
            window.alert("Failed to unenroll from the course.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Button variant="secondary" disabled>Processing...</Button>;
    }
    
    if (!currentUserId) {
        return <Button variant="secondary" disabled>Sign In to Enroll</Button>;
    }

    if (isEnrolled) {
        return (
            <Button variant="danger" onClick={handleUnenroll} disabled={loading}>
                Unenroll
            </Button>
        );
    } else {
        return (
            <Button variant="success" onClick={handleEnroll} disabled={loading}>
                Enroll
            </Button>
        );
    }
}