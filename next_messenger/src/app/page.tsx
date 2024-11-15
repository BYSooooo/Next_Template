import AuthList from "../main/AuthList";

export default function Page() {
    return (
      <div className="container flex flex-col mx-auto w-max
        text-center justify-center 
        pt-10">
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