import { Link } from "react-router-dom";

interface TitleProps {
  title: string;
  svg: string;
}

const Title: React.FC<TitleProps> = ({ title, svg }) => {
  return (
    <div className="flex flex-nowrap text-nowrap items-center gap-5 bg-white p-5 rounded-xl shadow-xl">
      <img
        src={svg}
        alt="car repair icon"
        className="size-16 rounded-md p-1 btn-success"
      />
      {title !== "Bienvenido a tu taller" ? (
        <Link to="/" className="text-3xl link link-underline">
          {title}
        </Link>
      ) : (
        <h1 className="text-3xl">{title}</h1>
      )}
    </div>
  );
};

export default Title;
