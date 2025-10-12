import Image from "next/image";

interface Props {
  role: string;
  company: string;
  year: string;
  description?: string;
  imgUrl: string;
}

const Education: React.FC<Props> = ({
  role,
  company,
  year,
  description,
  imgUrl,
}) => {
  return (
    <li className="bg-caption p-medium rounded-lg border border-gray-600 flex flex-col justify-between gap-large">
      <div className="flex flex-1 gap-medium justify-between items-start">
        <div className="flex flex-1 gap-medium min-w-0">
          <Image
            src={imgUrl}
            alt={company}
            width={56}
            height={56}
            className="rounded-full aspect-square w-14 h-14 object-cover"
          />
          <div className="min-w-0">
            <h4>{role}</h4>
            <p>{company}</p>
          </div>
        </div>
        <div className="inline-flex flex-wrap bg-tag-bg text-tag-text p-small rounded-md flex-shrink-0">
          <p className="tag-text">{year}</p>
        </div>
      </div>
      <p>{description}</p>
    </li>
  );
};

export default Education;
