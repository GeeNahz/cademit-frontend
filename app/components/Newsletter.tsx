import { FaTelegramPlane } from "react-icons/fa";

export default function Newsletter() {
    return (
        <div className="bg-primary">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 py-16 px-5 md:px-0">
                <div className="title text-secondary">
                    <p className="text-2xl font-semibold">Sign up to our Newsletter and don't miss a thing</p>

                    <p className="text-sm font-light text-slate-300">
                        Never miss out on any news and event at CADEMit. 
                    </p>
                </div>

                <form className="action border-b border-slate-100">
                    <label className="flex items-center gap-3" htmlFor="">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="w-72 md:w-80 py-2 bg-transparent border-0 focus:border-0 active:border-0 text-white placeholder:text-stone-200 placeholder:font-light placeholder:text-sm"
                            placeholder="Your email address"
                        />
                        <button type="submit" className="h-6 w-6 text-white" title="submit">
                            <FaTelegramPlane className="w-full h-full" />
                        </button>
                    </label>
                </form>
            </div>
        </div>
    );
}