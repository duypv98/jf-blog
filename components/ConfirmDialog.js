import { Button, OverlayTrigger, Popover } from "react-bootstrap"

/**
 *
 * @param {import("react").PropsWithChildren<{
 *  show: boolean;
 *  popoverId?: any;
 *  title?: import("react").ReactNode;
 *  body?: import("react").ReactNode;
 *  onClose?: () => void;
 *  onConfirm?: () => void;
 * }>} props
 */
export default function ConfirmDialog(props) {
  const {
    show,
    popoverId,
    title = "",
    body = "",
    onClose = () => { },
    onConfirm = () => { },
    children
  } = props

  return <OverlayTrigger
    show={show}
    trigger="click"
    placement="top"
    overlay={<Popover id={popoverId}>
      <Popover.Header>{title}</Popover.Header>
      <Popover.Body>
        {body}
        <div style={{ display: "flex", columnGap: "10px" }}>
          <Button size="sm" variant="info" onClick={() => {
            onConfirm();
          }}>Yes</Button>
          <Button size="sm" variant="danger" onClick={() => {
            onClose();
          }}>No</Button>
        </div>
      </Popover.Body>
    </Popover>}
  >
    {children}
  </OverlayTrigger>
}