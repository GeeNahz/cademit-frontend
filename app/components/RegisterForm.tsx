"use client";

import { FormEvent, useState } from "react";

type FormDataType = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    employment_status: string;
    course: string;
    experience_level: number;
    computer_access: boolean;
    internet_access: boolean;
    use_workspace: boolean;
    payment_approach: string;
}

type PropsType = {
    submitUrl: string;
    formTitle?: string;
    formDesc?: string;
    formFooter?: React.ReactNode;
}

function RegisterForm({ submitUrl, formTitle, formDesc, formFooter }: PropsType) {
    const [formData, setFormData] = useState<FormDataType>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        course: "",
        employment_status: "",
        payment_approach: "",
        experience_level: 0,
        computer_access: false,
        internet_access: false,
        use_workspace: false,
    });

    const employmentStatus = [
        { id: 1, status: "Employed", },
        { id: 2, status: "Self-employed", },
        { id: 3, status: "Student", },
    ];

    const courseList = [
        { id: 1, title: "Data Science", },
    ];

    const experienceLevel = [
        {
            id: 1,
            value: 0,
            desc: "(I'm new to this field and have no idea)",
        },
        {
            id: 2,
            value: 1,
            desc: "(I have a little idea but don't know what to do)",
        },
        {
            id: 3,
            value: 2,
            desc: "(I have idea and want to build it)",
        },
        {
            id: 4,
            value: 3,
            desc: "(I have good knowledge and want to advance)",
        },
    ];

    const paymentMethod = [
        { id: 1, method: "Full payment", },
        { id: 2, method: "Pay per module", }
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            let response = await fetch(submitUrl, {
                method: "POST",
                body: JSON.stringify(formData)
            });
            
            if (response.ok) console.log("RES DATA: ", await response.json());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-full w-full py-20 px-5 md:px-0">

            <div className="title mb-5 text-center">
                <h1 className="text-4xl font-bold mb-5">{ formTitle }</h1>
                <p className='text-sm text-slate-500 py-3 block text-center'>
                    { formDesc && formDesc }
                </p>
            </div>

            <div className="w-fit mx-auto divide-y">

                <form onSubmit={handleSubmit} className="py-10 px-3 block space-y-3">
                    <div className="group flex flex-col sm:flex-row gap-5">
                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>First name <span className="text-red-400">*</span></span>
                            <input type="text" className='form-input mt-1 block w-full rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' placeholder='John' value={formData.first_name} required onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))} />
                        </label>

                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Last name <span className="text-red-400">*</span></span>
                            <input type="text" className='form-input mt-1 block w-full rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' value={formData.last_name} placeholder='Doe' required onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))} />
                        </label>
                    </div>

                    <div className="group flex flex-col sm:flex-row gap-5">
                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Email <span className="text-red-400">*</span></span>
                            <input type="email" className='form-input mt-1 block w-full rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' placeholder='example@email.com' required value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                        </label>

                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Phone</span>
                            <input type="tel" className='form-input mt-1 block w-full rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' placeholder='+234 567 8901 234' value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                        </label>
                    </div>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Employment status <span className="text-red-400">*</span></span>
                        <select name="employment-status" id="employment-status" className="form-select w-full block mt-1 rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0" onChange={e => setFormData(prev => ({ ...prev, employment_status: e.target.value }))} required>
                            <option>-- Select status --</option>
                            {
                                employmentStatus.map((employment) => (
                                    <option key={employment.id} value={employment.status}>{employment.status}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Course <span className="text-red-400">*</span></span>
                        <select name="employment-status" id="employment-status" className="form-select w-full block mt-1 rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0" onChange={e => setFormData(prev => ({ ...prev, course: e.target.value }))} required>
                            <option>-- Select course --</option>
                            {
                                courseList.map((employment) => (
                                    <option key={employment.id} value={employment.title}>{employment.title}</option>
                                ))
                            }
                        </select>
                    </label>

                    <fieldset className="block w-full">
                        <legend className="text-slate-600 text-sm">Experience Level <span className="text-red-400">*</span></legend>
                        <span className="text-slate-400 text-xs">On a scale of 0 - 3, what is your experience level on the course you've chosen?</span>
                        <div className="mt-2">
                            {
                                experienceLevel.map((exp) => (
                                    <div key={exp.id}>
                                        <label className="inline-flex items-center">
                                            <input className="form-radio focus:ring-0" type="radio" name="experience-level" value={exp.value} required onChange={(e) => setFormData((prev) => ({ ...prev, experience_level: parseInt(e.target.value) }))} />
                                            <span className=" text-sm ml-2">{exp.value}. {exp.desc}</span>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </fieldset>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Method of payment <span className="text-red-400">*</span></span>
                        <select name="employment-status" id="employment-status" className="form-select w-full block mt-1 rounded border-transparent focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0" value={formData.payment_approach} onChange={(e) => setFormData((prev) => ({ ...prev, payment_approach: e.target.value }))} required>
                            <option>-- Select method of payment --</option>
                            {
                                paymentMethod.map((method) => (
                                    <option key={method.id} value={method.method}>{method.method}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Access to a computer</span>
                        <div className="flex items-center mt-2">
                            <input className="form-checkbox block" type="checkbox" checked={formData.computer_access} onChange={(e) => setFormData((prev => ({...prev, computer_access: e.target.checked})))} />
                            <span className="text-slate-500 text-xs ml-2">Do you have access to a working computer?</span>
                        </div>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Internet acess</span>
                        <div className="flex items-center mt-2">
                            <input className="form-checkbox block" type="checkbox" checked={formData.internet_access} onChange={(e) => setFormData((prev) => ({ ...prev, internet_access: e.target.checked }))} />
                            <span className="text-slate-500 text-xs ml-2">Do you have access to good internet?</span>
                        </div>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Our workspace</span>
                        <div className="flex items-center mt-2">
                            <input className="form-checkbox block" type="checkbox" checked={formData.use_workspace} onChange={(e) => setFormData((prev) => ({ ...prev, use_workspace: e.target.checked }))} />
                            <span className="text-slate-500 text-xs ml-2">Do you want to opt in to our workspace?</span>
                        </div>
                    </label>

                    <div className="action">
                        <button type="submit" className="btn btn-primary btn-block mt-5">Sign up</button>
                    </div>

                </form>

                <p className='text-sm text-slate-500 py-10 block text-center'>
                    { formFooter && formFooter }
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;
