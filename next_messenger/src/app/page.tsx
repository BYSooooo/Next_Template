import MessageToast from "../component/MessageToast";
import AuthList from "../main/AuthList";

export default function Page() {
    return (
      <div>
        <div className="container flex flex-col mx-auto w-max h-full text-center justify-center pt-10" >
          <h1 className="text-3xl font-bold">
            Sign In
          </h1>
          <h5>
            Please Select Service
          </h5>
          <AuthList />
        </div>
        <MessageToast type="error" popYn={false}/>
      </div>
    )
  }