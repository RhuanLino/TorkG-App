export type PrimaryVehicle = {
  id: string;
  nickname: string | null;
  plate: string | null;
  manufactureYear: number | null;
  modelYear: number | null;
  color: string | null;
  mileage: number;
  photoPath: string | null;
  brandName: string | null;
  modelName: string | null;
  vehicleVersion: string | null;
};

const apiUrl = process.env.EXPO_PUBLIC_TORKG_API_URL?.replace(/\/$/, '');

export async function getPrimaryVehicle(accessToken: string): Promise<PrimaryVehicle | null> {
  if (!apiUrl) {
    throw new Error('Defina EXPO_PUBLIC_TORKG_API_URL no arquivo .env do app.');
  }

  const response = await fetch(`${apiUrl}/api/v1/vehicle/primary`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Não foi possível carregar o seu veículo.');
  }

  return response.json() as Promise<PrimaryVehicle>;
}
