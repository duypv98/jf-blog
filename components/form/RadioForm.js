import { useState } from "react";
import { Form } from "react-bootstrap";

/**
 * @param {import("react").PropsWithoutRef<{
 *  options?: Array<{ label: import("react").ReactNode; value: string; }>;
 *  defaultChecked?: string;
 *  onChange?: (checked: string) => void;
 *  className?: string;
 * }>} props
 */
const RadioForm = (props) => {
  const {
    options = [],
    defaultChecked,
    onChange = () => { },
    className
  } = props;

  const [checked, setChecked] = useState(defaultChecked || options[0]?.value);

  /**
   *
   * @param {import("react").ChangeEvent<HTMLInputElement>} evt
   */
  const handleChange = (evt) => {
    evt.persist();
    const value = evt.target.value;
    setChecked(value);
    onChange(value);
  }

  return <div className={className}>
    {options.map(({ label, value }, i) => <Form.Check
      key={i}
      value={value}
      label={label}
      type="radio"
      onChange={handleChange}
      checked={value === checked}
    />)}
  </div>
}

export default RadioForm;