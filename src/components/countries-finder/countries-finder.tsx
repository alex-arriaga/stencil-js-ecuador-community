import {Component, Prop, State, Watch, h} from '@stencil/core';

@Component({
  tag: 'web-countries-finder',
  styleUrl: 'countries-finder.scss'
})
export class CountriesFinder {
  @Prop() keyword: string = 'mexico';
  @State() countries: Array<any> = [];

  render() {
    return (
      <div class="web-c-countries-finder">
        {this.countries.length === 0 ?
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div> :
          this.countries.map(country =>
            <div class="web-c-country-card">
              <div class="web-c-country-card__body">
                <div class="web-c-country-card__text-container">
                  <h3>{country.name.common}</h3>
                  <div class="bottom clearfix">
                    <p>
                      <strong>Official Name: </strong>{country.name.official}
                    </p>

                    <p>
                      <strong>Currency: </strong>{country.currency}
                    </p>
                    <p>
                      <strong>Languages: </strong>
                      <span>
                      {this.mapObjToArray(country.languages, ", ")}
                      </span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )
        }
      </div>
    );
  }

  mapObjToArray(obj, separator = "") {
    const array = [];
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        array.push(obj[property]);
        if (separator !== "") array.push(separator);
      }
    }

    return array;
  }

  getDataAndModifyState() {
    const serviceURL = `http://countries-finder-api.webtraining.fun/countries/search/${this.keyword}`;
    fetch(serviceURL).then((response: Response) => response.json()).then(response => {
      this.countries = this.mapObjToArray(response);
      console.log(this.countries);
    });
  }

  componentWillLoad() {
    this.getDataAndModifyState();
  }

  @Watch('keyword')
  watchHandler(newValue: string, oldValue: string) {
    console.log('The new keyword is: ', newValue, (oldValue));
    this.getDataAndModifyState();
  }
}
