
const options = [
  { value: "vs-dark", content: "Dark" },
  { value: "light", content: "Light" }
];

// eslint-disable-next-line react/prop-types
const EditorTheme = ({ theme, handleTheme }) => {
  return (
    <select
      className="p-2 ml-2 w-24 outline-none focus:ring-2 focus:ring-blue-500 bg-[#CED6E1] text-black text-sm rounded-lg"
      name="theme"
      value={theme}
      onChange={(info) => {
        handleTheme(info.target.value === "light" ? "light" : "vs-dark");
      }}
    >
      {options.map(({ value, content }) => (
        <option key={value} value={value}>
          {content}
        </option>
      ))}
    </select>
  );
};

export default EditorTheme;
