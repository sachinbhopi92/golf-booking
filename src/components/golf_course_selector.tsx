import React from "react";

interface Props {
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
}

const GolfCourseSelector: React.FC<Props> = ({
  selectedCourse,
  onSelectCourse,
}) => (
  <div className="mb-3">
    <label htmlFor="courseSelector" className="form-label">
      Select a Golf Course
    </label>
    <select
      id="courseSelector"
      className="form-select"
      value={selectedCourse}
      onChange={(e) => onSelectCourse(e.target.value)}
    >
      <option value="">Choose a Course</option>
      <option value="Course A">Course A</option>
      <option value="Course B">Course B</option>
      <option value="Course C">Course C</option>
    </select>
  </div>
);

export default GolfCourseSelector;
