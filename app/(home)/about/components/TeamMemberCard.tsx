
interface Props {
    name: string;
    position: string;
    imageUrl: string;
}

const TeamMemberCard = ({ name, position, imageUrl }: Props) => {
  return (
    <div className="card rounded-md h-96 w-72 shadow-none">
        <figure className="h-[360px] w-[288px]">
            <img src={imageUrl} alt={name} className="object-cover h-full w-full" />
        </figure>
        <div className="card-body gap-0 p-0 pt-3">
            <h6 className="font-semibold text-base text-start mb-0">{ name }</h6>
            <p className="position font-normal text-xs text-start text-neutral-500">{ position }</p>
        </div>
    </div>
  )
}

export default TeamMemberCard;