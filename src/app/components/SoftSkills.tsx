import Tags from "./Tags";

const SoftSkills = () => {
  return (
    <ul className="flex flex-wrap justify-end gap-x-small gap-y-small list-none w-full bg-white p-medium rounded-lg blue-shadow">
      <li>
        <Tags
          skill="Adaptability"
          bgColor="bg-violet-100"
          txtColor="text-violet-700"
        />
      </li>
      <li>
        <Tags
          skill="Enthusiastic"
          bgColor="bg-fuchsia-100"
          txtColor="text-fuchsia-500"
        />
      </li>
      <li>
        <Tags
          skill="Curious"
          bgColor="bg-amber-100"
          txtColor="text-amber-700"
        />
      </li>
      <li>
        <Tags
          skill="Communication"
          bgColor="bg-cyan-100"
          txtColor="text-cyan-900"
        />
      </li>
      <li>
        <Tags
          skill="Self-driven"
          bgColor="bg-rose-100"
          txtColor="text-rose-700"
        />
      </li>
      <li>
        <Tags
          skill="Solution Oriented"
          bgColor="bg-lime-100"
          txtColor="text-lime-800"
        />
      </li>
      <li>
        <Tags
          skill="Reflective"
          bgColor="bg-emerald-100"
          txtColor="text-emerald-800"
        />
      </li>
    </ul>
  );
};
export default SoftSkills;
