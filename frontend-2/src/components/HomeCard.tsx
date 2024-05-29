import { Link } from "react-router-dom";
import React from "react";

interface HomeCardProps {
  title: string;
  link: string;
  description: string;
  badges: string[];
  svg: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  link,
  description,
  badges,
  svg,
}) => {
  return (
    <div className="card bg-white">
      <div className="card-body">
        <h2 className="card-header justify-start items-center gap-2">
          <img
            src={svg}
            alt="car icon"
            className="btn-xs p-1 size-8 rounded-md btn-error"
          />
          {title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => {
            return <span className="badge badge-flat-success">{badge}</span>;
          })}
        </div>
        <div className="card-footer ">
          <Link className="btn btn-primary w-full mx-10" to={link}>
            {description}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
