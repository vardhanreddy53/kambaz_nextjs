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

    // ❗ IMPORTANT: never default a userId to "123"
    const currentUserId = currentUser?._id;

    const [loading, setLoading] = useState(false);

    const isEnrolled = !!enrollments.find(
        (e) => e.user === currentUserId && e.course === courseId
    );

    const handleEnroll = async () => {
        if (loading || !currentUserId) return;

        try {
            setLoading(true);
            const newEnrollment = await client.enrollInCourse(currentUserId, courseId);
            dispatch(addEnrollment(newEnrollment));
        } catch (error) {
            console.error("Error enrolling in course:", error);
            alert("Failed to enroll in the course.");
        } finally {
            setLoading(false);
        }
    };

    const handleUnenroll = async () => {
        if (loading || !currentUserId) return;

        if (!confirm("Are you sure you want to unenroll from this course?")) return;

        try {
            setLoading(true);
            await client.unenrollFromCourse(currentUserId, courseId);
            dispatch(removeEnrollment({ user: currentUserId, course: courseId }));

        } catch (error) {
            console.error("Error unenrolling:", error);
            alert("Failed to unenroll.");
        } finally {
            setLoading(false);
        }
    };

    if (!currentUserId) {
        return <Button variant="secondary" disabled>Sign In to Enroll</Button>;
    }

    if (loading) {
        return <Button variant="secondary" disabled>Processing...</Button>;
    }

    return isEnrolled ? (
        <Button variant="danger" onClick={handleUnenroll}>
            Unenroll
        </Button>
    ) : (
        <Button variant="success" onClick={handleEnroll}>
            Enroll
        </Button>
    );
}
