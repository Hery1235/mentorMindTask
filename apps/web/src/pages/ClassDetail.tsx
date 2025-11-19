import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoster, getMetrics } from "../api/classDetail";
import { Link } from "react-router-dom";
import ButtonNavigate from "../components/ButtonNavigate";

export const ClassDetail = () => {
  const { id } = useParams();

  const rosterQuery = useQuery({
    queryKey: ["roster", id],
    queryFn: () => getRoster(id!),
  });

  const metricsQuery = useQuery({
    queryKey: ["metrics", id],
    queryFn: () => getMetrics(id!),
  });

  if (rosterQuery.isLoading || metricsQuery.isLoading) {
    return <div className="p-6">Loading class details...</div>;
  }

  if (rosterQuery.isError || metricsQuery.isError) {
    return (
      <div className="p-6 text-red-500">
        Error loading class details. Please try again.
      </div>
    );
  }

  const roster = rosterQuery.data;
  const metrics = metricsQuery.data;

  return (
    <div className="p-6">
      <ButtonNavigate text="Back" url="http://localhost:5173/classes/" />
      <h1 className="text-3xl font-bold mb-6 mt-6">Class Details</h1>

      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Class Summary</h2>
        <p className="text-gray-600">Overview of student performance.</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Student Metrics</h2>
          <Link
            to={`/classes/${id}/create-assignment`}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Assignment
          </Link>
        </div>
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Student</th>
              <th className="p-3">Avg Score</th>
              <th className="p-3">Sessions (7d)</th>
              <th className="p-3">Avg Accuracy</th>
              <th className="p-3">Mood</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((student: any) => {
              const m = metrics.find((x: any) => x.studentId === student.id);

              return (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{m?.avgScorePct ?? "—"}</td>
                  <td className="p-3">{m?.sessionsThisWeek ?? 0}</td>
                  <td className="p-3">{m?.avgAccuracyPct ?? "—"}</td>
                  <td className="p-3">{m?.recentMood ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
