import React, { useRef } from "react";
import propTypes from "prop-types";

import "./index.scss";

export default function File(props) {
  const {
    outerClassName,
    prepend,
    append,
    name,
    inputClassName,
    value,
    placeholder,
    accept,
  } = props;

  const refInputFile = useRef(null);

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
          value={value}
          placeholder={placeholder}
          onChange={props.onChange}
        />
        <input
          onClick={() => refInputFile.current.click()}
          defaultValue={value}
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
