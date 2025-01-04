import AuthList from "../public/AuthList";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center h-svh">
          <div className="text-center">
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