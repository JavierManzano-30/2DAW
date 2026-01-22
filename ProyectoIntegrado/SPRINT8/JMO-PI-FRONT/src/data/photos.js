export const photos = [
  {
    id: '01',
    image: '/assets/photos/imagen1.jpg',
    user: 'Antonio123',
    city: 'Madrid',
    category: 'Naturaleza',
    votes: 23,
    description:
      'Pequenos detalles vegetales capturados con luz natural, donde las formas y los colores transmiten calma, frescura y conexion con el entorno.',
  },
  {
    id: '02',
    image: '/assets/photos/imagen2.jpg',
    user: 'LuisRGP',
    city: 'Cataluna',
    category: 'Naturaleza',
    votes: 30,
    description: 'Texturas suaves y tonos frios que recuerdan la quietud de la montana.',
  },
  {
    id: '03',
    image: '/assets/photos/imagen3.jpg',
    user: 'JavierManzano123',
    city: 'Andalucia',
    category: 'Montana',
    votes: 3,
    description: 'Luz de atardecer en la cumbre con un contraste frio y vibrante.',
  },
];

export function getPhotoById(photoId) {
  return photos.find((photo) => photo.id === photoId) || photos[0];
}
