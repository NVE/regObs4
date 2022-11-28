/**
 * A helper class to change url query parameters.
 * Usage: new UrlParams.set('hazard', 10).set('nick', 'siggen').apply()
 */
export class UrlParams {
  private params = new URLSearchParams(document.location.search);

  /**
   * Add a query parameter and a value
   * @param key parameter name
   * @param value if value is null, the parameter will be deleted from the url
   */
  set(key: string, value: unknown): UrlParams {
    if (value) {
      if (Array.isArray(value)) {
        this.params.delete(key);
        value.forEach((v) => this.params.append(key, '' + v));
      } else {
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
