import { removeOauthTokenFromUrl } from './url-utils';

const token = 'eyJruWQiOiJlTzRSeHRyR1Q3cEhTX1lBMTFsQzZhaVpFS21oTlRfd3pwcU5KakFQaVZ3IiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.c3De8v3nTGxjEn2yJKN_EBEtQ5xM7PoZxg-iu9cClCOVeqUUXpQaLQ-fpdqmtOW8B8FzjLGnYWV5V8K7_rerRCLrIMTZX7UjDvDRKQt6TF-xjCDFZCoMTLxTjXWeTaAA9NAumTRcC8ktzY1E0DLJJE-BTXwuiDXxFF3D4Y0gjzR1fE4nnGgkvTUs3-3g-Xf2HHSnOopjD7hutupDnq0MWIqfSm_lkDjF34PEJwm5IEmPPpF4tH-FORlnD2Zqefbhdw3D_6vnIyg6Xlk-x-IBZjq68dCWDfTreMsirsxq4Y1h9yPOzTjCrZwFQ3hLZ3std17G_cbhWcPWQYuwNKG13A.eWmfPVO6DrdjHqTh.2F633F5rk62O1kEok6VSsD1ZgxACxijMTfh9B6s3Pjr_0V8vRGBmeitTX6h0UQQeCn4oqBLCEbMWpYu0hub4QPJiTp6AFP_K-LB-5j3H6SFkW2MFB1HGXWs0Obv_k1ojuEhoI0jh6F3B3MANIsyu4tIePszNc84hQcCeZZ5jEu0w5pz-Lekz4WZLn2BtyIPjlH5Q7LhOFbGqDAmYRnKGeNrDygMazV69RnOndcKdM1f4s-hydLl8611KmJ6Owr2xST3Vxu_RDzOu-pIhXbtNOczph_PNKU_97QdRfrYSnV-v2bhXG9L9fhLBnnNLyK53_n_E7QAGVU8rFNnnJsgAuBRSxI8IF_nKR_JQilsmVG9vre_e7C2mLtgNFNPp14rKsPJmqgvwwztKKjKWMZyfY6At6GZo2FP5SzffFKPxpoL40zqVNwyv7P6VaTBGfkFnuJCcjUUGsExlvFgQvEBQ2dsqxet_2MthlSWSzzIbUMMUZ5xX3O5-RBaEAOslsHZ1fS6BaxP-hxvJb4kwHffntzVDbdd51QvCt8Kr9mzGFVvxDQciUUhVMr4BM-4rHBa7egEtaA1qT33QYl1BvXs6oGrZcnEeFvOXTxXp6tAM_IrfVxCtArpb1YxIFjfUW9fELkegvr0-6rmf9ZyNZMRyVoWn8bjMR0OVQdZc9yP7wtUCv2_CpEyhgnbsoKvBaIG1fZRshQ0KTIN6hjHNNs_mpK24D1KVN8wU6Ali5GWwbaFy5WV04geQ9VYUL3Q8-JflIMXYA4lZe7jb2htmHYfdxuV4Pf2ltwIX9McH4QDO.16I_L_2iaclQdqKrhDpUpw';

describe('UrlUtils', () => {
  it('should remove token from simple url', () => {
    const url = '/auth/callback?state=gMPL2bPeT1&code=' + token;
    const result = removeOauthTokenFromUrl(url);
    expect(result).toEqual('/auth/callback?state=gMPL2bPeT1&code=TOKEN_REMOVED');
  });

  // TODO: Fix this
  // it('should remove all tokens from multiple urls in a text', () => {
  //   const logOutputFromRouting = 'ResolveEnd(id: 1, url: \'/auth/callback?state=olfj7UX0gy&code=' + token + '\', urlAfterRedirects: \'/auth/callback?state=olfj7UX0gy&code=' + token + ', state: Route(url:\'\', path:\'\') { Route(url:\'\', path:\'\') { Route(url:\'auth/callback\', path:\'auth/callback\') { Route(url:\'\', path:\'\') }  }  } )';
  //   const result = removeOauthTokenFromUrl(logOutputFromRouting);
  //   expect(result).toEqual('ResolveEnd(id: 1, url: \'/auth/callback?state=olfj7UX0gy&code=TOKEN_REMOVED\', urlAfterRedirects: \'/auth/callback?state=olfj7UX0gy&code=TOKEN_REMOVED\', state: Route(url:\'\', path:\'\') { Route(url:\'\', path:\'\') { Route(url:\'auth/callback\', path:\'auth/callback\') { Route(url:\'\', path:\'\') }  }  } )');
  // });
});