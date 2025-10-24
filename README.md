# Calamity Check - Philippines Disaster Tracker

A disaster tracking application for the Philippines built with Next.js, Mantine UI, and TanStack Query.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd calamity-check
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Sources

- **Earthquakes**: [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/) - Real-time earthquake data for the Philippines region
- **Other Disasters**: Currently using mock data. In production, integrate with:
  - PAGASA (Philippine Atmospheric, Geophysical and Astronomical Services Administration)
  - PHIVOLCS (Philippine Institute of Volcanology and Seismology)
  - NWRB (National Water Resources Board)

## API Integration

### USGS Earthquake API

The application uses the USGS Earthquake API to fetch real earthquake data for the Philippines region (4.5°N to 21°N, 116°E to 127°E).

Example API call:

```
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-12-31&minlatitude=4.5&maxlatitude=21&minlongitude=116&maxlongitude=127&minmagnitude=2.0&orderby=time
```

### Future API Integrations

For production deployment, consider integrating with:

1. **PAGASA API** - Weather and flood monitoring
2. **PHIVOLCS API** - Volcanic activity and earthquake data
3. **NDRRMC API** - National disaster risk reduction data
4. **Local Dam APIs** - Real-time dam status monitoring

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Heroku**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- USGS for providing earthquake data
- Mantine team for the excellent UI components
- TanStack team for the powerful query library
- Next.js team for the amazing React framework
