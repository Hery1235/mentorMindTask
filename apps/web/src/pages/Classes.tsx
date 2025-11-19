import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../api/classes";
import { Link } from "react-router-dom";
import ButtonNavigate from "../components/ButtonNavigate";

export const Classes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading classes...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading classes. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6">
      <ButtonNavigate text="Logout" url="logout" />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((cls: any) => (
          <Link
            key={cls.id}
            to={`/classes/${cls.id}`}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800">{cls.name}</h2>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>{cls.studentCount ?? 0} Students</span>
              <span>{cls.assignmentCount ?? 0} Assignments</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
