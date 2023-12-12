/**
 *
 */
export const statusTranslation: {[key: number | string]: string} = {
	0: "L'API est hors ligne. Merci de réessayer plus tard !",
	401: 'Identifiants incorrects',
	403: 'Accès non autorisé',
	404: "Cette ressource n'existe pas !",
	409: 'Cette action est impossible à réaliser!',
	502: "L'API est en cours de redémarrage, Merci de réessayer plus tard!",
};

export const common_actions = {
	update: 'mise à jour',
	create: 'création',
	delete: 'suppression',
	get: 'récupération',
};
