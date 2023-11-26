import Button from "../components/Button/Button";

const onClickLoginPage = () => {
  console.log("test login button");
};

const StartPage = () => {
  return (
    <div>
      <Button
        onClick={onClickLoginPage}
        buttonText="login"
        className="login_button"
      />
    </div>
  );
};

export default StartPage;
