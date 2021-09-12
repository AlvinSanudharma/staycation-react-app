import React, { useRef, useState } from "react";
import propTypes from "prop-types";

import "./index.scss";

export default function File(props) {
  const [Filename, setFilename] = useState("");
  const {
    outerClassName,
    prepend,
    append,
    name,
    inputClassName,
    placeholder,
    accept,
  } = props;
  const refInputFile = useRef(null);

  const onChange = (event) => {
    setFilename(event.target.value);

    props.onChange({
      target: {
        name: event.target.name,
        value: event.target.files,
      },
    });
  };

  return (
    <div className={["input-text mb-3", outerClassName].join(" ")}>
      <div className="input-group">
        {prepend && (
          <div className="input-group-prepend bg-gray-900">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          accept={accept}
          ref={refInputFile}
          type="file"
          name={name}
          className="d-none"
          value={Filename}
          placeholder={placeholder}
          onChange={onChange}
        />
        <input
          onClick={() => refInputFile.current.click()}
          defaultValue={Filename}
          className={["form-control", inputClassName].join(" ")}
          placeholder={placeholder}
        />
        {append && (
          <div className="input-group-append bg-gray-900">
            <div className="input-group-text">{append}</div>
          </div>
        )}
      </div>
    </div>
  );
}

File.defaultProps = {
  placeholder: "Browse a file...",
};

File.propTypes = {
  outerClassName: propTypes.string,
  inputClassName: propTypes.string,
  name: propTypes.string.isRequired,
  accept: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  prepend: propTypes.oneOfType([propTypes.number, propTypes.string]),
  append: propTypes.oneOfType([propTypes.number, propTypes.string]),
  placeholder: propTypes.string,
};
