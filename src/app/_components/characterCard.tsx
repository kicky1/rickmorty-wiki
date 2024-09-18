import { Card, CardContent } from "@/components/ui/card";
import { Skull, Heart } from "lucide-react";
import { type Character } from "../types/character.type";
import Image from "next/image";

type Props = {
    character: Character
}

export function CharacterCard({character}: Props) {
    return (
        <Card key={character.id} className='border-2 border-green-500 bg-slate-900 drop-shadow-[1px_1px_5px_rgba(3,138,255,1)]'>
            <CardContent className="p-4">
                <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1 flex flex-col justify-center text-white'>
                    <h2 className="text-xl font-bold mb-2">{character.name}</h2>
                    <p>Status: {character.status === 'Dead' ? <Skull color='white' className="inline drop-shadow-[0px_0px_3px_rgba(3,138,255,1)]" height={18} width={18}/> : <Heart fill='red' color='red' className="inline drop-shadow-[0px_0px_3px_rgba(3,138,255,1)]" height={18} width={18}/>}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Origin: {character.origin.name}</p>
                    <p>Location: {character.location.name}</p>
                </div>
                <div className='col-span-1 justify-self-end'>
                    <Image src={character.image} alt={character.name} width={200} height={200} className='rounded'/>
                </div>
                </div>
            </CardContent>
        </Card>
    )
}