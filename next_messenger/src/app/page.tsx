import AuthList from "../public/AuthList";

export default function Page() {
    return (
        <div className="flex flex-col mx-auto w-max h-max text-center justify-center" >
          <h1 className="text-3xl font-bold">
            Sign In
          </h1>
          <h5>
            Please Select Service
          </h5>
          <AuthList />
        </div>
    )
  }