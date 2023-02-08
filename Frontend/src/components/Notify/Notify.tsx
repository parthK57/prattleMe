import "./Notify.css";

const Notify = (props: any) => {
  return (
    <>
      <div className="notify text-center">
        {props.message}
      </div>
    </>
  );
};

export default Notify;
