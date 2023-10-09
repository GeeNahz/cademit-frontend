import RegisterForm from "@/app/components/RegisterForm";

function PgSignup() {
    return (
        <div>
            <RegisterForm submitUrl="/api/pg-cohort/signup" formTitle="PG Cohort Signup" formFooter={<span>Sign up for the Data science PG Cohort program. <a href="#" className='link link-info'>Learn more.</a></span>} />
        </div>
    )
}

export default PgSignup;
