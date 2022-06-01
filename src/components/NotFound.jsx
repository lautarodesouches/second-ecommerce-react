// Components
import HomeButton from "./HomeButton";

const NotFound = ({ message }) => {
    return (
        <section className="container min-h-screen flex flex-col gap-6 items-center justify-center fade">
            <h2 className="text-2xl">{message}</h2>
            <HomeButton />
        </section>
    );
}

export default NotFound;