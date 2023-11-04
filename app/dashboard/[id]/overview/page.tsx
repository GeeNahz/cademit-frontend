"use client";


import { useEffect, useState } from "react";

import { FaPeopleGroup, FaCheckDouble, FaClock } from "react-icons/fa6";
import { FETCH_STATUS } from "@/utils/status";
import { prospects } from "@/services/ProspectService";

import Header from "../../components/Header"


type OverviewCardProps = {
  name: string;
  value: string | number | boolean;
  color?: string;
  children?: React.ReactNode;
};

function OverviewCard({ name, value, color, children }: OverviewCardProps) {
  return (
    <div className={color + " bg-gradient-to-tr rounded-lg shadow-md p-3 min-h-20 min-w-[200px] w-full relative overflow-hidden"}>
      <div>
        <h4 className="mt-2 font-semibold text-xs uppercase">{name}</h4>
        <p className="font-bold font-satoshi text-3xl">{value}</p>
      </div>
      <div className="opacity-40 self-end text-9xl absolute -bottom-10 -right-2 -rotate-12 text-white">{children}</div>
    </div>
  );
}

async function getProspects() {
  try {
    const response = await prospects()
    return response;
  } catch (error) {
    throw error;
  }
}

export default function Overview() {
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const [prospects, setProspects] = useState<any[]>();

  async function fetchProspects() {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const data = await getProspects();
      setProspects(data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error: any) {
      setStatus(FETCH_STATUS.ERROR);
      setErrorMessage(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProspects();
  }, []);

  if (status === FETCH_STATUS.LOADING) return (
    <>
      <Header pageTitle="Overview" />
      <div className="flex flex-wrap gap-5 justify-center mt-20">
        <p className="text-xl font-medium font-lora italic">Please wait...</p>
      </div>
    </>
  );

  return (
    <>
      <Header pageTitle="Overview" />
      <main>
        <section className="prospects-summary">
          <p className="font-light text-xs text-stone-500 mb-3">Prospects summary</p>
          <div className="flex gap-5">
            {
              prospects && (<>
                <OverviewCard
                  name="total applications"
                  value={prospects.length}
                  color="from-teal-400 to-teal-300"
                >
                  <FaPeopleGroup />
                </OverviewCard>

                <OverviewCard
                  name="approved applications"
                  value={prospects.filter((prospect) => prospect.is_approved === true).length}
                  color="from-sky-400 to-sky-300"
                >
                  <FaCheckDouble />
                </OverviewCard>

                <OverviewCard
                  name="pending applications"
                  value={prospects.filter((prospect) => prospect.is_approved !== true).length}
                  color="from-amber-400 to-amber-300"
                >
                  <FaClock />
                </OverviewCard>

              </>)
            }
          </div>
        </section>
      </main>
    </>
  )
}
