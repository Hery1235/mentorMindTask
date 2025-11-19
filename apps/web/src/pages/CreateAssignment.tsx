import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAssignment } from "../api/classDetail";
import ButtonNavigate from "../components/ButtonNavigate";

export const CreateAssignment = () => {
  const { id: classId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [timeEstimateMin, setTimeEstimateMin] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createAssignment({
        classId,
        title,
        topic,
        dueAt,
        timeEstimateMin,
      });
      navigate(`/classes/${classId}`);
    } catch (err: any) {
      setError(err.message || "Error creating assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <ButtonNavigate text="Discard" url="http://localhost:5173/classes" />
      <h1 className="text-3xl font-bold mb-6">Create Assignment</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Due Date</label>
          <input
            type="date"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Time Estimate (minutes)
          </label>
          <input
            type="number"
            value={timeEstimateMin}
            onChange={(e) => setTimeEstimateMin(Number(e.target.value))}
            required
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
};
