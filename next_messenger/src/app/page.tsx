import AuthList from "../public/AuthList";

export default function Page() {
    return (
        <div className="relative flex flex-col flex-grow items-center text-center ">
          <div className="static mt-10">
            <h1 className="text-3xl font-bold">
              Sign In
            </h1>
            <h5>
              Please Select Service
            </h5>
            <AuthList />
          </div>
        </div>
    )
  }