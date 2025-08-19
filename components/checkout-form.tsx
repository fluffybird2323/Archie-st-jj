'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { CountryCode, currencies } from '@/lib/i18n/config';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { submitPayment } from '@/app/actions';



export default function CheckoutForm() {
  const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;



  const { getTotalPrice, locale } = useCart();
  const initialCountry = (locale as Locale).country;

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState(initialCountry);

  const totalAmount = getTotalPrice(country);

  if (!appId || !locationId) {
    throw new Error("Square application ID or location ID is not defined");
  }

  return (
    <>
      <div className="section">
        <h2 className="section-title">Contact</h2>
        <div className="form-group">
          <input type="email" className="form-input" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group phone-input-group">
          <select className="form-input country-code-select" value={country} onChange={(e) => setCountry(e.target.value as CountryCode)} >
            <option value="+1">+1 (United States)</option>
            <option value="+44">+44 (United Kingdom)</option>
            <option value="+91">+91 (India)</option>
            <option value="+61">+61 (Australia)</option>
            <option value="+81">+81 (Japan)</option>
            <option value="+49">+49 (Germany)</option>
            <option value="+33">+33 (France)</option>
            <option value="+86">+86 (China)</option>
            <option value="+55">+55 (Brazil)</option>
            <option value="+27">+27 (South Africa)</option>
            <option value="+20">+20 (Egypt)</option>
            <option value="+34">+34 (Spain)</option>
            <option value="+39">+39 (Italy)</option>
            <option value="+52">+52 (Mexico)</option>
            <option value="+64">+64 (New Zealand)</option>
            <option value="+65">+65 (Singapore)</option>
            <option value="+82">+82 (South Korea)</option>
            <option value="+90">+90 (Turkey)</option>
            <option value="+971">+971 (United Arab Emirates)</option>
            <option value="+353">+353 (Ireland)</option>
            <option value="+1">+1 (Canada)</option>
            <option value="+7">+7 (Russia)</option>
            <option value="+31">+31 (Netherlands)</option>
            <option value="+46">+46 (Sweden)</option>
            <option value="+47">+47 (Norway)</option>
            <option value="+45">+45 (Denmark)</option>
            <option value="+358">+358 (Finland)</option>
            <option value="+41">+41 (Switzerland)</option>
            <option value="+43">+43 (Austria)</option>
            <option value="+32">+32 (Belgium)</option>
            <option value="+351">+351 (Portugal)</option>
            <option value="+48">+48 (Poland)</option>
            <option value="+420">+420 (Czech Republic)</option>
            <option value="+36">+36 (Hungary)</option>
            <option value="+30">+30 (Greece)</option>
            <option value="+972">+972 (Israel)</option>
            <option value="+966">+966 (Saudi Arabia)</option>
            <option value="+974">+974 (Qatar)</option>
            <option value="+965">+965 (Kuwait)</option>
            <option value="+973">+973 (Bahrain)</option>
            <option value="+968">+968 (Oman)</option>
            <option value="+961">+961 (Lebanon)</option>
            <option value="+962">+962 (Jordan)</option>
            <option value="+963">+963 (Syria)</option>
            <option value="+964">+964 (Iraq)</option>
            <option value="+98">+98 (Iran)</option>
            <option value="+92">+92 (Pakistan)</option>
            <option value="+880">+880 (Bangladesh)</option>
            <option value="+94">+94 (Sri Lanka)</option>
            <option value="+95">+95 (Myanmar)</option>
            <option value="+66">+66 (Thailand)</option>
            <option value="+84">+84 (Vietnam)</option>
            <option value="+60">+60 (Malaysia)</option>
            <option value="+62">+62 (Indonesia)</option>
            <option value="+63">+63 (Philippines)</option>
            <option value="+852">+852 (Hong Kong)</option>
            <option value="+853">+853 (Macau)</option>
            <option value="+886">+886 (Taiwan)</option>
            <option value="+855">+855 (Cambodia)</option>
            <option value="+856">+856 (Laos)</option>
            <option value="+977">+977 (Nepal)</option>
            <option value="+975">+975 (Bhutan)</option>
            <option value="+994">+994 (Azerbaijan)</option>
            <option value="+995">+995 (Georgia)</option>
            <option value="+374">+374 (Armenia)</option>
            <option value="+998">+998 (Uzbekistan)</option>
            <option value="+996">+996 (Kyrgyzstan)</option>
            <option value="+993">+993 (Turkmenistan)</option>
            <option value="+992">+992 (Tajikistan)</option>
            <option value="+7">+7 (Kazakhstan)</option>
            <option value="+375">+375 (Belarus)</option>
            <option value="+380">+380 (Ukraine)</option>
            <option value="+373">+373 (Moldova)</option>
            <option value="+370">+370 (Lithuania)</option>
            <option value="+371">+371 (Latvia)</option>
            <option value="+372">+372 (Estonia)</option>
            <option value="+359">+359 (Bulgaria)</option>
            <option value="+40">+40 (Romania)</option>
            <option value="+385">+385 (Croatia)</option>
            <option value="+381">+381 (Serbia)</option>
            <option value="+386">+386 (Slovenia)</option>
            <option value="+387">+387 (Bosnia and Herzegovina)</option>
            <option value="+389">+389 (North Macedonia)</option>
            <option value="+382">+382 (Montenegro)</option>
            <option value="+355">+355 (Albania)</option>
            <option value="+354">+354 (Iceland)</option>
            <option value="+350">+350 (Gibraltar)</option>
            <option value="+377">+377 (Monaco)</option>
            <option value="+378">+378 (San Marino)</option>
            <option value="+379">+379 (Vatican City)</option>
            <option value="+423">+423 (Liechtenstein)</option>
            <option value="+352">+352 (Luxembourg)</option>
            <option value="+376">+376 (Andorra)</option>
            <option value="+357">+357 (Cyprus)</option>
            <option value="+356">+356 (Malta)</option>
            <option value="+213">+213 (Algeria)</option>
            <option value="+216">+216 (Tunisia)</option>
            <option value="+212">+212 (Morocco)</option>
            <option value="+218">+218 (Libya)</option>
            <option value="+249">+249 (Sudan)</option>
            <option value="+251">+251 (Ethiopia)</option>
            <option value="+252">+252 (Somalia)</option>
            <option value="+253">+253 (Djibouti)</option>
            <option value="+254">+254 (Kenya)</option>
            <option value="+255">+255 (Tanzania)</option>
            <option value="+256">+256 (Uganda)</option>
            <option value="+257">+257 (Burundi)</option>
            <option value="+258">+258 (Mozambique)</option>
            <option value="+260">+260 (Zambia)</option>
            <option value="+263">+263 (Zimbabwe)</option>
            <option value="+266">+266 (Lesotho)</option>
            <option value="+268">+268 (Eswatini)</option>
            <option value="+269">+269 (Comoros)</option>
            <option value="+290">+290 (Saint Helena)</option>
            <option value="+291">+291 (Eritrea)</option>
            <option value="+297">+297 (Aruba)</option>
            <option value="+298">+298 (Faroe Islands)</option>
            <option value="+299">+299 (Greenland)</option>
            <option value="+500">+500 (Falkland Islands)</option>
            <option value="+501">+501 (Belize)</option>
            <option value="+502">+502 (Guatemala)</option>
            <option value="+503">+503 (El Salvador)</option>
            <option value="+504">+504 (Honduras)</option>
            <option value="+505">+505 (Nicaragua)</option>
            <option value="+506">+506 (Costa Rica)</option>
            <option value="+507">+507 (Panama)</option>
            <option value="+508">+508 (Saint Pierre and Miquelon)</option>
            <option value="+509">+509 (Haiti)</option>
            <option value="+590">+590 (Guadeloupe)</option>
            <option value="+591">+591 (Bolivia)</option>
            <option value="+592">+592 (Guyana)</option>
            <option value="+593">+593 (Ecuador)</option>
            <option value="+594">+594 (French Guiana)</option>
            <option value="+595">+595 (Paraguay)</option>
            <option value="+596">+596 (Martinique)</option>
            <option value="+597">+597 (Suriname)</option>
            <option value="+598">+598 (Uruguay)</option>
            <option value="+599">+599 (Curaçao, Sint Maarten, Bonaire)</option>
            <option value="+670">+670 (Timor-Leste)</option>
            <option value="+672">+672 (Norfolk Island)</option>
            <option value="+673">+673 (Brunei)</option>
            <option value="+674">+674 (Nauru)</option>
            <option value="+675">+675 (Papua New Guinea)</option>
            <option value="+676">+676 (Tonga)</option>
            <option value="+677">+677 (Solomon Islands)</option>
            <option value="+678">+678 (Vanuatu)</option>
            <option value="+679">+679 (Fiji)</option>
            <option value="+680">+680 (Palau)</option>
            <option value="+681">+681 (Wallis and Futuna)</option>
            <option value="+682">+682 (Cook Islands)</option>
            <option value="+683">+683 (Niue)</option>
            <option value="+685">+685 (Samoa)</option>
            <option value="+686">+686 (Kiribati)</option>
            <option value="+687">+687 (New Caledonia)</option>
            <option value="+688">+688 (Tuvalu)</option>
            <option value="+689">+689 (French Polynesia)</option>
            <option value="+690">+690 (Tokelau)</option>
            <option value="+691">+691 (Micronesia)</option>
            <option value="+692">+692 (Marshall Islands)</option>
            <option value="+850">+850 (North Korea)</option>
            <option value="+856">+856 (Laos)</option>
            <option value="+880">+880 (Bangladesh)</option>
            <option value="+886">+886 (Taiwan)</option>
            <option value="+960">+960 (Maldives)</option>
            <option value="+970">+970 (Palestine)</option>
            <option value="+995">+995 (Georgia)</option>
            <option value="+1242">+1 (Bahamas)</option>
            <option value="+1246">+1 (Barbados)</option>
            <option value="+1264">+1 (Anguilla)</option>
            <option value="+1268">+1 (Antigua and Barbuda)</option>
            <option value="+1284">+1 (British Virgin Islands)</option>
            <option value="+1340">+1 (U.S. Virgin Islands)</option>
            <option value="+1345">+1 (Cayman Islands)</option>
            <option value="+1441">+1 (Bermuda)</option>
            <option value="+1473">+1 (Grenada)</option>
            <option value="+1649">+1 (Turks and Caicos Islands)</option>
            <option value="+1664">+1 (Montserrat)</option>
            <option value="+1670">+1 (Northern Mariana Islands)</option>
            <option value="+1671">+1 (Guam)</option>
            <option value="+1684">+1 (American Samoa)</option>
            <option value="+1758">+1 (Saint Lucia)</option>
            <option value="+1767">+1 (Dominica)</option>
            <option value="+1784">+1 (Saint Vincent and the Grenadines)</option>
            <option value="+1787">+1 (Puerto Rico)</option>
            <option value="+1809">+1 (Dominican Republic)</option>
            <option value="+1868">+1 (Trinidad and Tobago)</option>
            <option value="+1869">+1 (Saint Kitts and Nevis)</option>
            <option value="+1876">+1 (Jamaica)</option>
            <option value="+1">+1 (Other Caribbean Islands)</option>
            <option value="+240">+240 (Equatorial Guinea)</option>
            <option value="+241">+241 (Gabon)</option>
            <option value="+242">+242 (Republic of the Congo)</option>
            <option value="+243">+243 (DR Congo)</option>
            <option value="+244">+244 (Angola)</option>
            <option value="+245">+245 (Guinea-Bissau)</option>
            <option value="+246">+246 (Diego Garcia)</option>
            <option value="+247">+247 (Ascension Island)</option>
            <option value="+248">+248 (Seychelles)</option>
            <option value="+249">+249 (Sudan)</option>
            <option value="+250">+250 (Rwanda)</option>
            <option value="+251">+251 (Ethiopia)</option>
            <option value="+252">+252 (Somalia)</option>
            <option value="+253">+253 (Djibouti)</option>
            <option value="+254">+254 (Kenya)</option>
            <option value="+255">+255 (Tanzania)</option>
            <option value="+256">+256 (Uganda)</option>
            <option value="+257">+257 (Burundi)</option>
            <option value="+258">+258 (Mozambique)</option>
            <option value="+260">+260 (Zambia)</option>
            <option value="+261">+261 (Madagascar)</option>
            <option value="+262">+262 (Réunion, Mayotte)</option>
            <option value="+263">+263 (Zimbabwe)</option>
            <option value="+264">+264 (Namibia)</option>
            <option value="+265">+265 (Malawi)</option>
            <option value="+266">+266 (Lesotho)</option>
            <option value="+267">+267 (Botswana)</option>
            <option value="+268">+268 (Eswatini)</option>
            <option value="+269">+269 (Comoros)</option>
            <option value="+290">+290 (Saint Helena, Tristan da Cunha)</option>
            <option value="+291">+291 (Eritrea)</option>
            <option value="+297">+297 (Aruba)</option>
            <option value="+298">+298 (Faroe Islands)</option>
            <option value="+299">+299 (Greenland)</option>
            <option value="+345">+1 (Cayman Islands)</option>
            <option value="+377">+377 (Monaco)</option>
            <option value="+378">+378 (San Marino)</option>
            <option value="+379">+379 (Vatican City)</option>
            <option value="+380">+380 (Ukraine)</option>
            <option value="+381">+381 (Serbia)</option>
            <option value="+382">+382 (Montenegro)</option>
            <option value="+383">+383 (Kosovo)</option>
            <option value="+385">+385 (Croatia)</option>
            <option value="+386">+386 (Slovenia)</option>
            <option value="+387">+387 (Bosnia and Herzegovina)</option>
            <option value="+389">+389 (North Macedonia)</option>
            <option value="+421">+421 (Slovakia)</option>
            <option value="+423">+423 (Liechtenstein)</option>
            <option value="+500">+500 (Falkland Islands)</option>
            <option value="+501">+501 (Belize)</option>
            <option value="+502">+502 (Guatemala)</option>
            <option value="+503">+503 (El Salvador)</option>
            <option value="+504">+504 (Honduras)</option>
            <option value="+505">+505 (Nicaragua)</option>
            <option value="+506">+506 (Costa Rica)</option>
            <option value="+507">+507 (Panama)</option>
            <option value="+508">+508 (Saint Pierre and Miquelon)</option>
            <option value="+509">+509 (Haiti)</option>
            <option value="+590">+590 (Guadeloupe, Saint Barthélemy, Saint Martin)</option>
            <option value="+591">+591 (Bolivia)</option>
            <option value="+592">+592 (Guyana)</option>
            <option value="+593">+593 (Ecuador)</option>
            <option value="+594">+594 (French Guiana)</option>
            <option value="+595">+595 (Paraguay)</option>
            <option value="+596">+596 (Martinique)</option>
            <option value="+597">+597 (Suriname)</option>
            <option value="+598">+598 (Uruguay)</option>
            <option value="+599">+599 (Curaçao, Sint Maarten, Bonaire)</option>
            <option value="+670">+670 (Timor-Leste)</option>
            <option value="+672">+672 (Australia External Territories)</option>
            <option value="+673">+673 (Brunei Darussalam)</option>
            <option value="+674">+674 (Nauru)</option>
            <option value="+675">+675 (Papua New Guinea)</option>
            <option value="+676">+676 (Tonga)</option>
            <option value="+677">+677 (Solomon Islands)</option>
            <option value="+678">+678 (Vanuatu)</option>
            <option value="+679">+679 (Fiji)</option>
            <option value="+680">+680 (Palau)</option>
            <option value="+681">+681 (Wallis and Futuna)</option>
            <option value="+682">+682 (Cook Islands)</option>
            <option value="+683">+683 (Niue)</option>
            <option value="+685">+685 (Samoa)</option>
            <option value="+686">+686 (Kiribati)</option>
            <option value="+687">+687 (New Caledonia)</option>
            <option value="+688">+688 (Tuvalu)</option>
            <option value="+689">+689 (French Polynesia)</option>
            <option value="+690">+690 (Tokelau)</option>
            <option value="+691">+691 (Micronesia, Federated States of)</option>
            <option value="+692">+692 (Marshall Islands)</option>
            <option value="+850">+850 (North Korea)</option>
            <option value="+855">+855 (Cambodia)</option>
            <option value="+856">+856 (Laos)</option>
            <option value="+880">+880 (Bangladesh)</option>
            <option value="+960">+960 (Maldives)</option>
            <option value="+970">+970 (Palestine, State of)</option>
            <option value="+975">+975 (Bhutan)</option>
            <option value="+976">+976 (Mongolia)</option>
            <option value="+977">+977 (Nepal)</option>
            <option value="+992">+992 (Tajikistan)</option>
            <option value="+993">+993 (Turkmenistan)</option>
            <option value="+994">+994 (Azerbaijan)</option>
            <option value="+995">+995 (Georgia)</option>
            <option value="+996">+996 (Kyrgyzstan)</option>
            <option value="+998">+998 (Uzbekistan)</option>
          </select>
          <input type="tel" className="form-input" placeholder={`Phone Number (e.g., ${currencies[country].phoneCode} 123-456-7890)`} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

      </div>
      <div className="section">
        <h2 className="section-title">Delivery</h2>
        <div className="form-group">
          <input type="text" className="form-input" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="text" className="form-input" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="text" className="form-input" placeholder="Apartment, suite, etc. (optional)" value={apartment} onChange={(e) => setApartment(e.target.value)} />
        </div>
        <div className="form-row-thirds">
          <div className="form-group">
            <input type="text" className="form-input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="State / Province" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div className="form-group">
            <select className="form-input" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="IN">India</option>
            <option value="BR">Brazil</option>
            <option value="ZA">South Africa</option>
            <option value="EG">Egypt</option>
            <option value="ES">Spain</option>
            <option value="IT">Italy</option>
            <option value="MX">Mexico</option>
            <option value="NZ">New Zealand</option>
            <option value="SG">Singapore</option>
            <option value="KR">South Korea</option>
            <option value="TR">Turkey</option>
            <option value="AE">United Arab Emirates</option>
            <option value="IE">Ireland</option>
            <option value="RU">Russia</option>
            <option value="NL">Netherlands</option>
            <option value="SE">Sweden</option>
            <option value="NO">Norway</option>
            <option value="DK">Denmark</option>
            <option value="FI">Finland</option>
            <option value="CH">Switzerland</option>
            <option value="AT">Austria</option>
            <option value="BE">Belgium</option>
            <option value="PT">Portugal</option>
            <option value="PL">Poland</option>
            <option value="CZ">Czech Republic</option>
            <option value="HU">Hungary</option>
            <option value="GR">Greece</option>
            <option value="IL">Israel</option>
            <option value="SA">Saudi Arabia</option>
            <option value="QA">Qatar</option>
            <option value="KW">Kuwait</option>
            <option value="BH">Bahrain</option>
            <option value="OM">Oman</option>
            <option value="LB">Lebanon</option>
            <option value="JO">Jordan</option>
            <option value="SY">Syria</option>
            <option value="IQ">Iraq</option>
            <option value="IR">Iran</option>
            <option value="PK">Pakistan</option>
            <option value="BD">Bangladesh</option>
            <option value="LK">Sri Lanka</option>
            <option value="MM">Myanmar</option>
            <option value="TH">Thailand</option>
            <option value="VN">Vietnam</option>
            <option value="MY">Malaysia</option>
            <option value="ID">Indonesia</option>
            <option value="PH">Philippines</option>
            <option value="HK">Hong Kong</option>
            <option value="MO">Macau</option>
            <option value="TW">Taiwan</option>
            <option value="KH">Cambodia</option>
            <option value="LA">Laos</option>
            <option value="NP">Nepal</option>
            <option value="BT">Bhutan</option>
            <option value="AZ">Azerbaijan</option>
            <option value="GE">Georgia</option>
            <option value="AM">Armenia</option>
            <option value="UZ">Uzbekistan</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="TM">Turkmenistan</option>
            <option value="TJ">Tajikistan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="BY">Belarus</option>
            <option value="UA">Ukraine</option>
            <option value="MD">Moldova</option>
            <option value="LT">Lithuania</option>
            <option value="LV">Latvia</option>
            <option value="EE">Estonia</option>
            <option value="BG">Bulgaria</option>
            <option value="RO">Romania</option>
            <option value="HR">Croatia</option>
            <option value="RS">Serbia</option>
            <option value="SI">Slovenia</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="MK">North Macedonia</option>
            <option value="ME">Montenegro</option>
            <option value="AL">Albania</option>
            <option value="IS">Iceland</option>
            <option value="GI">Gibraltar</option>
            <option value="MC">Monaco</option>
            <option value="SM">San Marino</option>
            <option value="VA">Vatican City</option>
            <option value="LI">Liechtenstein</option>
            <option value="LU">Luxembourg</option>
            <option value="AD">Andorra</option>
            <option value="CY">Cyprus</option>
            <option value="MT">Malta</option>
            <option value="DZ">Algeria</option>
            <option value="TN">Tunisia</option>
            <option value="MA">Morocco</option>
            <option value="LY">Libya</option>
            <option value="SD">Sudan</option>
            <option value="ET">Ethiopia</option>
            <option value="SO">Somalia</option>
            <option value="DJ">Djibouti</option>
            <option value="KE">Kenya</option>
            <option value="TZ">Tanzania</option>
            <option value="UG">Uganda</option>
            <option value="BI">Burundi</option>
            <option value="MZ">Mozambique</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
            <option value="LS">Lesotho</option>
            <option value="SZ">Eswatini</option>
            <option value="KM">Comoros</option>
            <option value="SH">Saint Helena</option>
            <option value="ER">Eritrea</option>
            <option value="AW">Aruba</option>
            <option value="FO">Faroe Islands</option>
            <option value="GL">Greenland</option>
            <option value="FK">Falkland Islands</option>
            <option value="BZ">Belize</option>
            <option value="GT">Guatemala</option>
            <option value="SV">El Salvador</option>
            <option value="HN">Honduras</option>
            <option value="NI">Nicaragua</option>
            <option value="CR">Costa Rica</option>
            <option value="PA">Panama</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="HT">Haiti</option>
            <option value="GP">Guadeloupe</option>
            <option value="BO">Bolivia</option>
            <option value="GY">Guyana</option>
            <option value="EC">Ecuador</option>
            <option value="GF">French Guiana</option>
            <option value="PY">Paraguay</option>
            <option value="MQ">Martinique</option>
            <option value="SR">Suriname</option>
            <option value="UY">Uruguay</option>
            <option value="CW">Curaçao</option>
            <option value="TL">Timor-Leste</option>
            <option value="NF">Norfolk Island</option>
            <option value="BN">Brunei</option>
            <option value="NR">Nauru</option>
            <option value="PG">Papua New Guinea</option>
            <option value="TO">Tonga</option>
            <option value="SB">Solomon Islands</option>
            <option value="VU">Vanuatu</option>
            <option value="FJ">Fiji</option>
            <option value="PW">Palau</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="CK">Cook Islands</option>
            <option value="NU">Niue</option>
            <option value="WS">Samoa</option>
            <option value="KI">Kiribati</option>
            <option value="NC">New Caledonia</option>
            <option value="TV">Tuvalu</option>
            <option value="PF">French Polynesia</option>
            <option value="TK">Tokelau</option>
            <option value="FM">Micronesia</option>
            <option value="MH">Marshall Islands</option>
            <option value="KP">North Korea</option>
            <option value="PS">Palestine</option>
            <option value="MN">Mongolia</option>
            <option value="MV">Maldives</option>
            <option value="BS">Bahamas</option>
            <option value="BB">Barbados</option>
            <option value="AI">Anguilla</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="VG">British Virgin Islands</option>
            <option value="VI">U.S. Virgin Islands</option>
            <option value="KY">Cayman Islands</option>
            <option value="BM">Bermuda</option>
            <option value="GD">Grenada</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="MS">Montserrat</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="GU">Guam</option>
            <option value="AS">American Samoa</option>
            <option value="LC">Saint Lucia</option>
            <option value="DM">Dominica</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="PR">Puerto Rico</option>
            <option value="DO">Dominican Republic</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="JM">Jamaica</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="GA">Gabon</option>
            <option value="CG">Republic of the Congo</option>
            <option value="CD">DR Congo</option>
            <option value="AO">Angola</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="IO">Diego Garcia</option>
            <option value="AC">Ascension Island</option>
            <option value="SC">Seychelles</option>
            <option value="RW">Rwanda</option>
            <option value="MG">Madagascar</option>
            <option value="RE">Réunion</option>
            <option value="YT">Mayotte</option>
            <option value="NA">Namibia</option>
            <option value="MW">Malawi</option>
            <option value="BW">Botswana</option>
            <option value="XK">Kosovo</option>
            <option value="SK">Slovakia</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} />
          </div>
        </div>
      </div>
      <PaymentForm
        applicationId={appId}
        locationId={locationId}
        cardTokenizeResponseReceived={async ({ token }) => {


           if (token) {
            const customerResponse = await fetch('/api/create-customer', {
              method: 'POST',
              headers: {
                 'Content-Type': 'application/json',
               },
                body: JSON.stringify({ email, phone, fullName, address, apartment, city, state, zip, country }),
            });

            const customerData = await customerResponse.json();

            if (customerData.error) {
              console.error(customerData.error);
              return;
            }

            try {
              const result = await submitPayment(token, customerData.id, totalAmount, country);
            } catch (error) {
              console.error('Error calling submitPayment:', error);
            }
            
          }
        }}
      >
        <div className="section">
          <h2 className="section-title">Payment</h2>
          <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
          <div className="form-group">
            <div style={{ minHeight: '100px', width: '100%' }}>
              <CreditCard />
            </div>
          </div>
        </div>
      </PaymentForm>
    </>
  );
}