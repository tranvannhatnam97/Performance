const Seasons = {
	Summer: "summer",
	Autumn: "autumn",
	Winter: "winter",
	Spring: "spring"
}
export function feeder(){
    return (Object.values(Seasons)[Math.floor(Math.random() * Object.keys(Seasons).length)]); 
}