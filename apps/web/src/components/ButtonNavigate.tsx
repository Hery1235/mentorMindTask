import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  text: string;
  url: string;
  className?: string; // make it optional
}

const ButtonNavigate = ({ text, url, className }: NavigateButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url === "logout") {
      localStorage.removeItem("token"); // clear JWT
      navigate("/"); // redirect to login page
    } else {
      navigate(url); // navigate to the given URL
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        " cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      }
    >
      {text}
    </button>
  );
};

export default ButtonNavigate;
