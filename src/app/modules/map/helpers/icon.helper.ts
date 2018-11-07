import * as L from 'leaflet';

export class IconHelper {
    static getPreviousUsedPlacesIcon(count: number): L.DivIcon {
        return L.divIcon({
            html: IconHelper.getPreviousUsedPlacesIconSvg(count),
            iconSize: [45, 42],
            iconAnchor: [22, 42],
            className: 'shadow-marker'
        });
    }

    static getMixedObservationsClusterIcon(count: number): L.DivIcon {
        return L.divIcon({
            html: IconHelper.getMixedObservationsClusterSvg(count, 45, 42),
            iconSize: [45, 42],
            iconAnchor: [22, 42],
            className: 'shadow-marker'
        });
    }

    static getIceObservationsClusterIcon(count: number): L.DivIcon {
        return L.divIcon({
            html: IconHelper.getIceObservationsClusterSvg(count, 45, 42),
            iconSize: [45, 42],
            iconAnchor: [22, 42],
            className: 'shadow-marker'
        });
    }

    static getPreviousUsedPlacesIconSvg(count: number, width = 45, height = 42): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="${width}px" height="${height}px" viewBox="0 0 30 28" version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: sketchtool 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
            <title>981C3C2F-F7D3-464F-828C-99DD98279C07</title>
            <desc>Created with sketchtool.</desc>
            <g id="Ikoner" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="10.1.1-Ikoner-samleark" transform="translate(-180.000000, -241.000000)">
                    <g id="Page"></g>
                    <g id="Tidligere-obs-punkter" transform="translate(93.000000, 241.000000)">
                        <g id="lokasjonsmarkør/observasjonspunkt/cluster2" transform="translate(87.000000, 0.000000)">
                            <rect id="Background" x="0" y="0" width="30" height="28"></rect>
                            <g>
                                <g id="location/pin" transform="translate(18.000000, 4.000000)">
                                    <rect id="Background" x="0" y="0" width="12" height="18.8571429"></rect>
                                    <path d="M6,17.9200809 C9.66552912,12.0708657 11.5,
                                    8.08509605 11.5,6.06122449 C11.5,2.98871509 9.03642344,0.5 6,0.5 C2.96357656,0.5 0.5,
                                    2.98871509 0.5,6.06122449 C0.5,8.08509605 2.33447088,12.0708657 6,17.9200809 Z"
                                    id="Oval" stroke="#326680" fill="#468EB2" fill-rule="nonzero"></path>
                                </g>
                                <g id="location/pin" transform="translate(0.000000, 4.000000)">
                                    <rect id="Background" x="0" y="0" width="12" height="18.8571429"></rect>
                                    <path d="M6,17.9200809 C9.66552912,12.0708657 11.5,8.08509605 11.5,6.06122449 C11.5,
                                    2.98871509 9.03642344,0.5 6,0.5 C2.96357656,0.5 0.5,2.98871509 0.5,6.06122449 C0.5,
                                    8.08509605 2.33447088,12.0708657 6,17.9200809 Z" id="Oval" stroke="#326680"
                                    fill="#468EB2" fill-rule="nonzero"></path>
                                </g>
                                <g id="location/pin" transform="translate(6.000000, 0.000000)">
                                    <rect id="Background" x="0" y="0" width="18" height="28"></rect>
                                    <path d="M9,27.0711862 C14.6654126,18.1632591 17.5,12.1049889 17.5,
                                    9 C17.5,4.30557963 13.6944204,0.5 9,0.5 C4.30557963,0.5 0.5,4.30557963 0.5,
                                    9 C0.5,12.1049889 3.33458739,18.1632591 9,27.0711862 Z" id="Oval"
                                    stroke="#326680" fill="#468EB2" fill-rule="nonzero"></path>
                                </g>
                                <text id="99" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="7"
                                font-weight="normal" fill="#FFFFFF">
                                    <tspan x="12.021" y="18">${count > 99 ? 99 : count}</tspan>
                                </text>
                                <g id="icon/12/pin" transform="translate(11.000000, 3.000000)">
                                    <rect id="Background" x="0" y="0" width="8" height="8"></rect>
                                    <path d="M3.43013501,4.2509755 C2.60319196,4.00560506 2,3.23991071 2,
                                    2.33333333 C2,1.22876383 2.8954305,0.333333333 4,0.333333333 C5.1045695,
                                    0.333333333 6,1.22876383 6,2.33333333 C6,3.23991071 5.39680804,4.00560506 4.56986499,
                                    4.2509755 L4.33333333,7.30769231 C4.33333333,7.50594837 4.18409492,7.66666667 4,
                                    7.66666667 C3.81590508,7.66666667 3.66666667,7.50594837 3.66666667,
                                    7.30769231 L3.43013501,4.2509755 Z" id="Combined-Shape" fill="#FFFFFF"
                                    fill-rule="nonzero"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="Page"></g>
            </g>
        </svg>`;
    }

    static getMixedObservationsClusterSvg(count: number, width = 45, height = 42): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="${width}px" height="${height}px" viewBox="0 0 30 28"
        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Ikoner" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="10.1.1-Ikoner-samleark" transform="translate(-221.000000, -203.000000)">
                    <g id="Page"></g>
                    <g id="observasjoner---Is" transform="translate(93.000000, 203.000000)">
                        <g id="observasjoner/flere/cluster2" transform="translate(128.000000, 0.000000)">
                            <rect id="Background" x="0" y="0" width="30" height="28"></rect>
                            <path d="M24,21.9200809 C27.6655291,16.0708657 29.5,12.085096 29.5,10.0612245 C29.5,
                            6.98871509 27.0364234,4.5 24,4.5 C20.9635766,4.5 18.5,6.98871509 18.5,10.0612245 C18.5,
                            12.085096 20.3344709,16.0708657 24,21.9200809 Z" id="Oval" stroke="#326680" fill="#FFFFFF"
                            fill-rule="nonzero"></path>
                            <path d="M6,21.9200809 C9.66552912,16.0708657 11.5,12.085096 11.5,10.0612245 C11.5,
                            6.98871509 9.03642344,4.5 6,4.5 C2.96357656,4.5 0.5,6.98871509 0.5,10.0612245 C0.5,
                            12.085096 2.33447088,16.0708657 6,21.9200809 Z" id="Oval" stroke="#326680" fill="#FFFFFF"
                            fill-rule="nonzero"></path>
                            <path d="M15,27.0711862 C20.6654126,18.1632591 23.5,12.1049889 23.5,9 C23.5,4.30557963 19.6944204,
                            0.5 15,0.5 C10.3055796,0.5 6.5,4.30557963 6.5,9 C6.5,12.1049889 9.33458739,18.1632591 15,
                            27.0711862 Z" id="Oval" stroke="#326680" fill="#FFFFFF" fill-rule="nonzero"></path>
                            <g id="icon/12/pin" transform="translate(11.000000, 3.000000)">
                                <rect id="Background" x="0" y="0" width="8" height="8"></rect>
                                <path d="M3.43013501,4.2509755 C2.60319196,4.00560506 2,3.23991071 2,2.33333333 C2,
                                1.22876383 2.8954305,0.333333333 4,0.333333333 C5.1045695,0.333333333 6,1.22876383 6,
                                2.33333333 C6,3.23991071 5.39680804,4.00560506 4.56986499,4.2509755 L4.33333333,
                                7.30769231 C4.33333333,7.50594837 4.18409492,7.66666667 4,7.66666667 C3.81590508,
                                7.66666667 3.66666667,7.50594837 3.66666667,7.30769231 L3.43013501,4.2509755 Z"
                                id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path>
                            </g>
                            <text id="99" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="9"
                            font-weight="normal" fill="#468EB3">
                                <tspan x="10.527" y="13">${count > 99 ? 99 : count}</tspan>
                            </text>
                        </g>
                    </g>
                </g>
                <g id="Page"></g>
            </g>
        </svg>`;
    }

    static getIceObservationsClusterSvg(count: number, width = 45, height = 42): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="${width}px" height="${height}px" viewBox="0 0 30 28" version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: sketchtool 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
            <title>E955196A-D4FD-4F9C-9DA8-8A27C97853EF</title>
            <desc>Created with sketchtool.</desc>
            <g id="Ikoner" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="10.1.1-Ikoner-samleark" transform="translate(-180.000000, -203.000000)">
                    <g id="Page"></g>
                    <g id="observasjoner---Is" transform="translate(93.000000, 203.000000)">
                        <g id="observasjoner/is/cluster2" transform="translate(87.000000, 0.000000)">
                            <rect id="Background" x="0" y="0" width="30" height="28"></rect>
                            <path d="M24,21.9200809 C27.6655291,16.0708657 29.5,12.085096 29.5,10.0612245 C29.5,
                            6.98871509 27.0364234,4.5 24,4.5 C20.9635766,4.5 18.5,6.98871509 18.5,10.0612245 C18.5,
                            12.085096 20.3344709,16.0708657 24,21.9200809 Z" id="Oval" stroke="#326680" fill="#FFFFFF"
                            fill-rule="nonzero"></path>
                            <path d="M6,21.9200809 C9.66552912,16.0708657 11.5,12.085096 11.5,10.0612245 C11.5,
                            6.98871509 9.03642344,4.5 6,4.5 C2.96357656,4.5 0.5,6.98871509 0.5,10.0612245 C0.5,
                            12.085096 2.33447088,16.0708657 6,21.9200809 Z" id="Oval" stroke="#326680" fill="#FFFFFF"
                            fill-rule="nonzero"></path>
                            <path d="M15,27.0711862 C20.6654126,18.1632591 23.5,12.1049889 23.5,9 C23.5,4.30557963 19.6944204,
                            0.5 15,0.5 C10.3055796,0.5 6.5,4.30557963 6.5,9 C6.5,12.1049889 9.33458739,18.1632591 15,
                            27.0711862 Z" id="Oval" stroke="#326680" fill="#FFFFFF" fill-rule="nonzero"></path>
                            <text id="99" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="7"
                            font-weight="normal" fill="#FFFFFF">
                                <tspan x="12.021" y="18">99</tspan>
                            </text>
                            <g id="icon/12/pin" transform="translate(11.000000, 3.000000)">
                                <rect id="Background" x="0" y="0" width="8" height="8"></rect>
                                <path d="M3.43013501,4.2509755 C2.60319196,4.00560506 2,3.23991071 2,2.33333333 C2,
                                1.22876383 2.8954305,0.333333333 4,0.333333333 C5.1045695,0.333333333 6,1.22876383 6,
                                2.33333333 C6,3.23991071 5.39680804,4.00560506 4.56986499,4.2509755 L4.33333333,
                                7.30769231 C4.33333333,7.50594837 4.18409492,7.66666667 4,7.66666667 C3.81590508,
                                7.66666667 3.66666667,7.50594837 3.66666667,7.30769231 L3.43013501,4.2509755 Z"
                                id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path>
                            </g>
                            <text id="99" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="7"
                            font-weight="normal" fill="#468EB3">
                                <tspan x="11.521" y="18">${count > 99 ? 99 : count}</tspan>
                            </text>
                            <g id="Icon/12/ice" transform="translate(11.000000, 4.000000)">
                                <rect id="Background" x="0" y="0" width="8" height="8"></rect>
                                <polygon id="Is" fill="#468EB3" points="1.40740741 3.13043478 1.96296296
                                0.695652174 2.88888889 5.91304348 3.25925926 0.695652174 4.74074074 8 5.85185185
                                0.695652174 6.59259259 3.13043478 7.33333333 0 0.666666667 0"></polygon>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="Page"></g>
            </g>
        </svg>`;
    }
}
