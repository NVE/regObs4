/**
 * A helper class to change url query parameters.
 * Usage: new UrlParams.set('hazard', 10).set('nick', 'siggen').apply()
 */
export class UrlParams {

  private params = new URLSearchParams(document.location.search);

  set(key: string, value: unknown): UrlParams {
    if (value) {
      if (Array.isArray(value)) {
        this.params.delete(key);
        value.forEach(v =>  this.params.append(key, '' + v));
      } else {
        //TODO: Handle datetime. Maybe only show yy-MM-dd if time is 00:00 to make url simpler?
        this.params.set(key, '' + value);
      }
    } else {
      this.delete(key);
    }
    return this;
  }

  delete(key: string): UrlParams {
    this.params.delete(key);
    return this;
  }

  apply(): UrlParams {
    const newRelativePathQuery = window.location.pathname + '?' + this.params.toString();
    history.pushState(null, '', newRelativePathQuery);
    return this;
  }
}