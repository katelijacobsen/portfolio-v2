import Image from "next/image";

interface Props {
  role: string;
  company: string;
  year: string;
  imgUrl: string;
  points?: string[];
}

const Experience: React.FC<Props> = ({
  role,
  company,
  year,
  points = [],
  imgUrl,
}) => {
  return (
    <li className="bg-caption p-medium rounded-lg border border-gray-600 grid grid-cols-[3.5rem_auto_auto] grid-rows-[auto_auto]  gap-medium text-tag-text">
      <div className="min-w-0 flex gap-medium col-start-1 col-end-3">
          <Image
            src={imgUrl}
            alt={company}
            width={56}
            height={56}
            className="rounded-full aspect-square w-14 h-14 object-cover"
          />
          <div>
            <h4 className="whitespace-normal">{role}</h4>
            <p>{company}</p>
          </div>
        </div>
        <div className="bg-tag-bg p-small rounded-md h-fit w-fit justify-self-end row-start-1 col-start-3">
          <p className="tag-text">{year}</p>
        </div>
        <ul className="col-start-1 col-end-3 pl-6">
          {points.map((point, i) => (
            <li key={i} className="list-disc">{point}</li>
          ))}
        </ul>
    </li>
  );
};

export default Experience;
