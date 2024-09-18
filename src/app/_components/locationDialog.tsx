import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { graphQLClient } from "@/lib/graphqlClient";
import { GET_LOCATION_QUERY } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

type Location = {
    id: string;
    name: string;
    type: string;
    dimension: string;
};

type LocationDialogProps = {
    id: string;
};

export default function LocationDialog({ id }: LocationDialogProps) {
    const { data, error, isLoading } = useQuery<Location, Error>({
        queryKey: ['location', id],  // Pass id in the query key
        queryFn: async () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            const response = await graphQLClient.request<any>(GET_LOCATION_QUERY, { locationId: id });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            return response.location;
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-2 w-[180px] bg-slate-900 border-2 border-green-500 drop-shadow-[1px_1px_5px_rgba(3,138,255,1)] hover:bg-green-500">Location info</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Location Information</DialogTitle>
                    <DialogDescription>
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {data && (
                            <div>
                                <p><strong>Name:</strong> {data.name}</p>
                                <p><strong>Dimension:</strong> {data.dimension}</p>
                                <p><strong>Type:</strong> {data.type}</p>
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}