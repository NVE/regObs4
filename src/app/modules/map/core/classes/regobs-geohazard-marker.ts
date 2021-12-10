import * as L from 'leaflet';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

export class RegobsGeoHazardMarker extends L.DivIcon {
  private _selected: boolean;
  private _geoHazard: GeoHazard;

  constructor(geoHazard: GeoHazard, isSelected = false) {
    super({
      html: RegobsGeoHazardMarker.getIconSvg(geoHazard, isSelected),
      className: 'obs-marker',
      iconSize: [30, 40],
      iconAnchor: [15, 40]
    });
    this._selected = isSelected;
    this._geoHazard = geoHazard;
  }

  static getIconSvg(geoHazard: GeoHazard, isSelected: boolean) {
    switch (geoHazard) {
    case GeoHazard.Snow:
      return this.getSnowSvg(isSelected);
    case GeoHazard.Water:
      return this.getWaterSvg(isSelected);
    case GeoHazard.Dirt:
      return this.getDirtSvg(isSelected);
    case GeoHazard.Ice:
      return this.getIceSvg(isSelected);
    default:
      return '';
    }
  }

  static getDirtSvg(isSelected: boolean) {
    return `<svg width="44" height="49" viewBox="0 0 44 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f)">
        <ellipse cx="22.6509" cy="30.7147" rx="11.7128" ry="5.55783" transform="rotate(-22 22.6509 30.7147)"
        fill="#222222" fill-opacity="0.5"/>
        </g>
        <path d="M16.2064 36.6548L16.2167 36.6438L16.2264 36.6322C17.0774 35.6109 18.1068 34.2426 19.313 32.5314C20.5211
        30.8176 21.7424 28.9786 22.977 27.0144C24.2251 25.0289 25.2879 22.9028 26.1659 20.637C27.0471 18.3628 27.5 16.3143
        27.5 14.5C27.5 10.901 26.2317 7.82326 23.7042 5.29578C21.1767 2.76829 18.099 1.5 14.5 1.5C10.901 1.5 7.82326 2.76829
        5.29578 5.29578C2.76829 7.82326 1.5 10.901 1.5 14.5C1.5 16.3162 1.96777 18.3934 2.87649 20.722C3.77997 23.0372 4.78458
        25.1184 5.89172 26.9636C6.99252 28.7983 8.27499 30.6864 9.73828 32.6281C11.1911 34.5559 12.2079 35.8559 12.7804
        36.5143C13.3394 37.1571 13.7859 37.6734 14.1204 38.0636L14.4826 38.4863L14.8641 38.0809L16.2064 36.6548Z"
        fill="white" stroke="#6996A3" ${isSelected ? 'stroke-width="2"' : ''}/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4393 8.97889L13.2781 8.36161V7.60109L13.5285 7.14778C13.5285
        7.14778 13.3626 6.7814 13.6667 6.47276C13.9707 6.16412 14.4393 6.2233 14.4393 6.2233L15.5811 6.59498L16.0331
        7.60109L15.5811 8.36161L14.4393 8.97889ZM9.21558 18.0642L11.7039 16.6533V14.915L11.1672 13.8789C11.1672 13.8789
        11.5227 13.0414 10.8712 12.3359C10.2196 11.6305 9.21558 11.7657 9.21558 11.7657L6.76875 12.6153L5.80029
        14.915L6.76875 16.6533L9.21558 18.0642ZM15.4051 13.4481L13.6964 14.114L12.2349 13.142C12.2349 13.142 11.9599
        12.35 12.2349 11.5708C12.51 10.7917 13.2123 10.5891 13.6964 10.5891C13.8491 10.5891 13.9824 10.5799 14.1016
        10.5716H14.1016C14.4851 10.545 14.7226 10.5285 14.9923 10.8625C15.3459 11.3003 15.6396 11.9625 15.6396
        12.3516C15.6396 12.6999 15.4051 13.4481 15.4051 13.4481ZM18.9523 7.79359L21.2305 8.75553C21.2305 8.75553 21.5432
        9.83629 21.5432 10.3394C21.5432 10.9014 21.1516 11.8578 20.6802 12.4902C20.3206 12.9726 20.0039 12.9488 19.4926
        12.9104C19.3337 12.8985 19.1559 12.8851 18.9523 12.8851C18.3068 12.8851 17.3704 12.5926 17.0037 11.4671C16.637
        10.3417 17.0037 9.19758 17.0037 9.19758L18.9523 7.79359ZM19.4509 21.8207L15.9016 23.1995L12.8284 21.8207L11.7039
        18.52L13.409 17.3211C13.409 17.3211 13.8988 16.0489 14.5026 15.5251C15.1064 15.0014 16.6509 14.5091 16.6509
        14.5091L19.7238 15.7208L21.1496 18.8961L19.9429 20.2002L19.4509 21.8207Z" fill="#735E2F"/>
        <defs>
        <filter id="filter0_f" x="1.70898" y="13.1738" width="41.8838" height="35.0816" filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        </defs>
        </svg>
        `;
  }

  static getIceSvg(isSelected: boolean) {
    return `<svg width="44" height="49" viewBox="0 0 44 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f)">
        <ellipse cx="22.6509" cy="30.7147" rx="11.7128" ry="5.55783" transform="rotate(-22 22.6509 30.7147)"
        fill="#222222" fill-opacity="0.5"/>
        </g>
        <path d="M16.2064 36.6548L16.2167 36.6438L16.2264 36.6322C17.0774 35.6109 18.1068 34.2426 19.313 32.5314C20.5211
        30.8176 21.7424 28.9786 22.977 27.0144C24.2251 25.0289 25.2879 22.9028 26.1659 20.637C27.0471 18.3628 27.5 16.3143
        27.5 14.5C27.5 10.901 26.2317 7.82326 23.7042 5.29578C21.1767 2.76829 18.099 1.5 14.5 1.5C10.901 1.5 7.82326 2.76829
        5.29578 5.29578C2.76829 7.82326 1.5 10.901 1.5 14.5C1.5 16.3162 1.96777 18.3934 2.87649 20.722C3.77997 23.0372
        4.78458 25.1184 5.89172 26.9636C6.99252 28.7983 8.27499 30.6864 9.73828 32.6281C11.1911 34.5559 12.2079 35.8559
        12.7804 36.5143C13.3394 37.1571 13.7859 37.6734 14.1204 38.0636L14.4826 38.4863L14.8641 38.0809L16.2064 36.6548Z"
        fill="white" stroke="#6996A3" ${isSelected ? 'stroke-width="2"' : ''}/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.47844 15.9942L10.6624 10.906L12.3033 22.1253L13.8669
        11.4343L16.0693 27.0301L18.3694 10.7425L19.8358 15.9942L21.7189
        9.25H18.5801H17.9526H14.1864H13.5585H11.0477H10.4202H7.90918L9.47844 15.9942Z" fill="#009FD4"/>
        <defs>
        <filter id="filter0_f" x="1.70898" y="13.1738" width="41.8838" height="35.0816" filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        </defs>
        </svg>
        `;
  }

  static getWaterSvg(isSelected: boolean) {
    return `<svg width="44" height="49" viewBox="0 0 44 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f)">
        <ellipse cx="22.6509" cy="30.7147" rx="11.7128" ry="5.55783" transform="rotate(-22 22.6509 30.7147)"
         fill="#222222" fill-opacity="0.5"/>
        </g>
        <path d="M16.2064 36.6548L16.2167 36.6438L16.2264 36.6322C17.0774 35.6109 18.1068 34.2426 19.313
        32.5314C20.5211 30.8176 21.7424 28.9786 22.977 27.0144C24.2251 25.0289 25.2879 22.9028 26.1659 20.637C27.0471
        18.3628 27.5 16.3143 27.5 14.5C27.5 10.901 26.2317 7.82326 23.7042 5.29578C21.1767 2.76829 18.099 1.5 14.5 1.5C10.901
        1.5 7.82326 2.76829 5.29578 5.29578C2.76829 7.82326 1.5 10.901 1.5 14.5C1.5 16.3162 1.96777 18.3934 2.87649
        20.722C3.77997 23.0372 4.78458 25.1184 5.89172 26.9636C6.99252 28.7983 8.27499 30.6864 9.73828 32.6281C11.1911
        34.5559 12.2079 35.8559 12.7804 36.5143C13.3394 37.1571 13.7859 37.6734 14.1204 38.0636L14.4826 38.4863L14.8641
        38.0809L16.2064 36.6548Z" fill="white" stroke="#6996A3" ${
  isSelected ? 'stroke-width="2"' : ''
}/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8746 12.8977C21.8901 12.9116 21.9057 12.9257 21.9216
        12.94C22.4737 13.435 23.2353 14.0483 24.4158 14.0483V12.1652C23.8256 12.1652 23.4353 11.8854 22.9688
        11.4658C22.9505 11.4493 22.932 11.4328 22.9135 11.4161C22.3736 10.9307 21.7358 10.3574 20.4841 10.3574C19.1894
        10.3574 18.5039 10.9708 17.9613 11.4658C17.5043 11.8854 17.1902 12.1652 16.4857 12.1652C15.7874 12.1652 15.482
        11.8904 15.0225 11.4769L15.0101 11.4658C14.4674 10.9708 13.7915 10.3574 12.4968 10.3574C11.2116 10.3574 10.5262
        10.9708 9.98352 11.4658C9.52656 11.8854 9.22192 12.1652 8.51744 12.1652C7.82826 12.1652 7.53085 11.8975 7.08151
        11.4929C7.07154 11.4839 7.06149 11.4749 7.05137 11.4658C6.50873 10.9708 5.72809 10.3574 4.55713
        10.3574V12.2405C5.13785 12.2405 5.54721 12.5203 6.01369 12.94C6.02002 12.9458 6.02638 12.9516 6.03275
        12.9574C6.57176 13.4492 7.22833 14.0483 8.50792 14.0483C9.79312 14.0483 10.4786 13.435 11.0212 12.94L11.0336
        12.9288C11.4931 12.5154 11.7986 12.2405 12.4968 12.2405C13.195 12.2405 13.5005 12.5154 13.96 12.9288L13.9724
        12.94C14.515 13.435 15.191 14.0483 16.4857 14.0483C17.7627 14.0483 18.4382 13.4427 18.9884 12.9494L18.999
        12.94C19.4559 12.5203 19.7606 12.2405 20.465 12.2405C21.1456 12.2405 21.4352 12.5016 21.8746 12.8977ZM21.9216
        17.2901C22.4737 17.7851 23.2353 18.3985 24.4063 18.3985H24.4158V16.5153C23.8256 16.5153 23.4353 16.2356
        22.9688 15.8159C22.9505 15.7995 22.932 15.7829 22.9135 15.7662C22.3736 15.2809 21.7358 14.7076 20.4841
        14.7076C19.1894 14.7076 18.5039 15.3209 17.9613 15.8159C17.5043 16.2356 17.1902 16.5153 16.4857 16.5153C15.7874
        16.5153 15.482 16.2405 15.0225 15.827L15.0101 15.8159C14.4674 15.3209 13.7915 14.7076 12.4968 14.7076C11.2116
        14.7076 10.5262 15.3209 9.98352 15.8159C9.52656 16.2356 9.22192 16.5153 8.51744 16.5153C7.82826 16.5153 7.53085
        16.2476 7.08151 15.843C7.07154 15.8341 7.06149 15.825 7.05137 15.8159C6.50873 15.3209 5.72809 14.7076 4.55713
        14.7076V16.5907C5.13785 16.5907 5.54721 16.8704 6.01369 17.2901C6.02002 17.2959 6.02638 17.3017 6.03274
        17.3075C6.57175 17.7993 7.22832 18.3985 8.50792 18.3985C9.79312 18.3985 10.4786 17.7851 11.0212 17.2901L11.0336
        17.279C11.4931 16.8655 11.7986 16.5907 12.4968 16.5907C13.195 16.5907 13.5005 16.8655 13.96 17.279L13.9724
        17.2901C14.515 17.7851 15.191 18.3985 16.4857 18.3985C17.7627 18.3985 18.4382 17.7929 18.9884 17.2996L18.999
        17.2901C19.4559 16.8704 19.7606 16.5907 20.465 16.5907C21.1455 16.5907 21.4352 16.8517 21.8746 17.2478C21.8901
        17.2617 21.9057 17.2758 21.9216 17.2901Z" fill="#009FD4"/>
        <defs>
        <filter id="filter0_f" x="1.70898" y="13.1738" width="41.8838" height="35.0816" filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        </defs>
        </svg>
        `;
  }

  static getSnowSvg(isSelected: boolean) {
    return `<svg width="44" height="49" viewBox="0 0 44 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f)">
        <ellipse cx="22.6509" cy="30.7147" rx="11.7128" ry="5.55783" transform="rotate(-22 22.6509 30.7147)"
        fill="#222222" fill-opacity="0.5"/>
        </g>
        <path d="M16.2064 36.6548L16.2167 36.6438L16.2264 36.6322C17.0774 35.6109 18.1068 34.2426 19.313 32.5314C20.5211
        30.8176 21.7424 28.9786 22.977 27.0144C24.2251 25.0289 25.2879 22.9028 26.1659 20.637C27.0471 18.3628 27.5 16.3143
        27.5 14.5C27.5 10.901 26.2317 7.82326 23.7042 5.29578C21.1767 2.76829 18.099 1.5 14.5 1.5C10.901 1.5 7.82326 2.76829
        5.29578 5.29578C2.76829 7.82326 1.5 10.901 1.5 14.5C1.5 16.3162 1.96777 18.3934 2.87649 20.722C3.77997 23.0372
        4.78458 25.1184 5.89172 26.9636C6.99252 28.7983 8.27499 30.6864 9.73828 32.6281C11.1911 34.5559 12.2079 35.8559
        12.7804 36.5143C13.3394 37.1571 13.7859 37.6734 14.1204 38.0636L14.4826 38.4863L14.8641 38.0809L16.2064 36.6548Z"
        fill="white" stroke="#6996A3" ${isSelected ? 'stroke-width="2"' : ''}/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2733 16.4665L19.7322 16.7602L21.4486 17.7126C21.5901 17.7897
        21.6809 17.9039 21.7209 18.0552C21.7609 18.2065 21.7409 18.3504 21.6609 18.4869C21.5748 18.6234 21.4548 18.7109
        21.301 18.7495C21.1472 18.7881 20.9996 18.7688 20.8581 18.6916L19.1417 17.7482L19.6492 19.1723C19.7292 19.3978
        19.6923 19.5861 19.5385 19.7375C19.3847 19.8888 19.1986 19.9496 18.9802 19.9199C18.7618 19.8903 18.6126 19.7656
        18.5326 19.5461L17.5914 16.8759L15.0906 15.4874V18.2733L17.01 20.3917C17.1084 20.4985 17.1607 20.6142 17.1669
        20.7388C17.173 20.8634 17.1392 20.9717 17.0654 21.0637C16.9915 21.1556 16.9039 21.2298 16.8024 21.2862C16.7009
        21.3425 16.5871 21.3589 16.4609 21.3351C16.3348 21.3114 16.2226 21.2461 16.1241 21.1393L15.0906 20V21.9048C15.0906
        22.0591 15.0321 22.1926 14.9153 22.3053C14.7984 22.418 14.66 22.4744 14.5 22.4744C14.34 22.4744 14.2016 22.418
        14.0847 22.3053C13.9679 22.1926 13.9094 22.0591 13.9094 21.9048V20L12.8759 21.1393C12.7775 21.2461 12.6652 21.3114
        12.5391 21.3351C12.4129 21.3589 12.2991 21.3425 12.1976 21.2862C12.0961 21.2298 12.0085 21.1556 11.9346
        21.0637C11.8608 20.9717 11.827 20.8634 11.8331 20.7388C11.8393 20.6142 11.8916 20.4985 11.99 20.3917L13.9094
        18.2733V15.4874L11.4086 16.8759L10.4674 19.5461C10.3874 19.7656 10.2382 19.8903 10.0198 19.9199C9.80144 19.9496
        9.61534 19.8888 9.46154 19.7375C9.30774 19.5861 9.27083 19.3978 9.35081 19.1723L9.85835 17.7482L8.14195
        18.6916C8.00045 18.7688 7.85281 18.7881 7.69901 18.7495C7.54521 18.7109 7.42524 18.6234 7.33912 18.4869C7.25914
        18.3504 7.23915 18.2065 7.27913 18.0552C7.31912 17.9039 7.40986 17.7897 7.55136 17.7126L9.26776 16.7602L7.72669
        16.4665C7.54828 16.4309 7.41909 16.3448 7.33912 16.2083C7.25914 16.0719 7.23299 15.9339 7.26068 15.7945C7.28836
        15.655 7.3668 15.5363 7.49599 15.4384C7.62518 15.3405 7.77898 15.3094 7.95739 15.345L10.8181 15.8968L13.3188
        14.4994L10.8181 13.102L7.95739 13.6539C7.93278 13.6598 7.89279 13.6628 7.83742 13.6628C7.67132 13.6628 7.53598
        13.6093 7.4314 13.5025C7.32681 13.3957 7.26837 13.2771 7.25606 13.1465C7.24376 13.016 7.2776 12.8884 7.35757
        12.7638C7.43755 12.6392 7.56059 12.562 7.72669 12.5324L9.26776 12.2386L7.55136 11.2863C7.40986 11.2091 7.31912
        11.0949 7.27913 10.9436C7.23915 10.7923 7.25914 10.6484 7.33912 10.5119C7.41909 10.3754 7.53905 10.2864 7.69901
        10.2449C7.85896 10.2034 8.0066 10.2241 8.14195 10.3072L9.85835 11.2507L9.35081 9.82656C9.27083 9.60108 9.30774
        9.41268 9.46154 9.26137C9.61534 9.11006 9.80144 9.04924 10.0198 9.07891C10.2382 9.10858 10.3874 9.23318 10.4674
        9.45273L11.4086 12.1229L13.9094 13.5114V10.7255L11.99 8.60717C11.8916 8.50036 11.8393 8.38465 11.8331
        8.26005C11.827 8.13543 11.8608 8.02714 11.9346 7.93517C12.0085 7.8432 12.0961 7.76902 12.1976 7.71265C12.2991
        7.65628 12.4129 7.63997 12.5391 7.6637C12.6652 7.68743 12.7775 7.75271 12.8759 7.85951L13.9094 8.9988V7.09406C13.9094
        6.93978 13.9679 6.80627 14.0847 6.69353C14.2016 6.58079 14.34 6.52441 14.5 6.52441C14.66 6.52441 14.7984 6.58079
        14.9153 6.69353C15.0321 6.80627 15.0906 6.93978 15.0906 7.09406V8.9988L16.1241 7.85951C16.2226 7.75271
        16.3348 7.68743 16.4609 7.6637C16.5871 7.63997 16.7009 7.65628 16.8024 7.71265C16.9039 7.76902 16.9915
        7.8432 17.0654 7.93517C17.1392 8.02714 17.173 8.13543 17.1669 8.26005C17.1607 8.38465 17.1084 8.50036
        17.01 8.60717L15.0906 10.7255V13.5114L17.5914 12.1229L18.5326 9.45273C18.6126 9.23318 18.7618 9.10858
        18.9802 9.07891C19.1986 9.04924 19.3847 9.11006 19.5385 9.26137C19.6923 9.41268 19.7292 9.60108 19.6492
        9.82656L19.1417 11.2507L20.8581 10.3072C20.9996 10.2301 21.1472 10.2108 21.301 10.2493C21.4548 10.2879
        21.5748 10.3754 21.6609 10.5119C21.7409 10.6484 21.7609 10.7923 21.7209 10.9436C21.6809 11.0949 21.5901
        11.2091 21.4486 11.2863L19.7322 12.2386L21.2733 12.5324C21.4394 12.562 21.5625 12.6392 21.6424 12.7638C21.7224
        12.8884 21.7562 13.016 21.7439 13.1465C21.7316 13.2771 21.6732 13.3957 21.5686 13.5025C21.464 13.6093 21.3287
        13.6628 21.1626 13.6628C21.1072 13.6628 21.0672 13.6598 21.0426 13.6539L18.1819 13.102L15.6812 14.4994L18.1819
        15.8968L21.0426 15.345C21.221 15.3094 21.3748 15.3405 21.504 15.4384C21.6332 15.5363 21.7116 15.655 21.7393
        15.7945C21.767 15.9339 21.7409 16.0719 21.6609 16.2083C21.5809 16.3448 21.4517 16.4309 21.2733 16.4665Z"
        fill="#009FD4"/>
        <defs>
        <filter id="filter0_f" x="1.70898" y="13.1738" width="41.8838" height="35.0816" filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        </defs>
        </svg>
        `;
  }

  redraw() {
    this.options.html = RegobsGeoHazardMarker.getIconSvg(
      this._geoHazard,
      this._selected
    );
  }

  setGeoHazard(geoHazard: GeoHazard) {
    this._geoHazard = geoHazard;
    this.redraw();
  }

  setSelected(selected: boolean) {
    this._selected = selected;
    this.redraw();
  }
}
