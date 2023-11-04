import { FormField, FormSelectOptions, INPUT_TYPES } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function generateFormFields(field: FormField, data: {} | any, setData: Dispatch<SetStateAction<any>>, index: string | number) {
    const [passwordType, setPasswordType] = useState("password");
    switch (field.type) {
        case INPUT_TYPES.TEXT:
        case INPUT_TYPES.EMAIL:
        case INPUT_TYPES.TEL:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full">
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        {field.label} {field.fieldProps?.required ? <span className="text-red-400">*</span> : null}
                    </span>

                    <input
                        type={field.type}
                        id={field.fieldProps?.id}
                        value={(field.value as string | number)}
                        onChange={(e) => setData({ ...data, [field.fieldName]: e.target.value })}
                        placeholder={field.fieldProps?.placeholder}
                        required={field.fieldProps?.required}
                        className="form_input"
                    />
                </label>
            );
        case INPUT_TYPES.PASSWORD:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full">
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        {field.label} {field.fieldProps?.required ? <span className="text-red-400">*</span> : null}
                    </span>

                    <div className="relative w-full h-full">
                        <input
                            type={passwordType}
                            id={field.fieldProps?.id}
                            value={(field.value as string | number)}
                            onChange={(e) => setData({ ...data, [field.fieldName]: e.target.value })}
                            placeholder={field.fieldProps?.placeholder}
                            required={field.fieldProps?.required}
                            className="form_input relative"
                        />
                        <span
                            onClick={() => {
                                passwordType === "password"
                                    ? setPasswordType("text")
                                    : setPasswordType("password")
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                            {passwordType === "password" ? <FaEyeSlash className="text-stone-400" /> : <FaEye className="text-stone-400" />}
                        </span>

                    </div>
                </label>
            );
        case INPUT_TYPES.TEXTAREA:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full">
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        {field.label} {field.fieldProps?.required ? <span className="text-red-400">*</span> : null}
                    </span>

                    <textarea
                        name={field.fieldName}
                        id={field.fieldProps?.id}
                        cols={30}
                        rows={10}
                        value={field.value as string}
                        onChange={(e) => setData({ ...data, [field.fieldName]: e.target.value })}
                        required={field.fieldProps?.required}
                        placeholder={field.fieldProps?.placeholder}
                        className="form_textarea"
                    ></textarea>
                </label>
            );
        case INPUT_TYPES.RADIO:
            return (
                <label key={field.fieldName}>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        {field.label} {field.fieldProps?.required ? <span className="text-red-400">*</span> : null}
                    </span>

                    {
                        (field?.selectOptions as []).map((option: FormSelectOptions) => (
                            <div key={option.id} className="mb-1">
                                <input
                                    type={field.type}
                                    name={field.fieldName}
                                    value={(option.value).toString()}
                                    onChange={(e) => setData({ ...data, [field.fieldName]: parseInt(e.target.value) })}
                                    required
                                />
                                <span className="ml-3">{option.title}</span>
                            </div>
                        ))
                    }
                </label>
            );
        case INPUT_TYPES.CHECKBOX:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full flex items-center gap-3">
                    <input
                        type={field.type}
                        id={field.fieldProps?.id}
                        checked={field.value as boolean}
                        onChange={(e) => setData({ ...data, [field.fieldName]: e.target.checked })
                        }
                        className="rounded border border-stone-400"
                        required={field.fieldProps?.required}
                    />
                    <span className="font-satoshi font-normal text-base text-gray-500">{field.label} {field.fieldProps?.required ? <span className="text-red-400">*</span> : null}</span>
                </label>
            );
        case INPUT_TYPES.SELECT:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full">
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        {field.label} {field.fieldProps?.required ? <span className="text-red-400">*</span> : null}
                    </span>

                    <select name={field.fieldName} id={field.fieldProps?.id} onChange={(e) => setData({ ...data, [field.fieldName]: e.target.value })} value={field.value as string} required={field.fieldProps?.required} className="form_input">
                        <option value="">-- Select {field.label} --</option>
                        {
                            (field.selectOptions as []).map((option: FormSelectOptions) => (
                                <option key={option.id} value={(option.value as string | number)}>{option.title}</option>
                            ))
                        }
                    </select>
                </label>
            );
        default:
            return (
                <p key={index} className="text-red text-lg font-semibold text-center py-5">Please provide a field with valid input type: {field.type}</p>
            );
    };
}

export { generateFormFields };