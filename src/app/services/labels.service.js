export default class LabelService {
  constructor($firebaseArray, $firebaseObject) {
    'ngInject';

    this._$firebaseObject = $firebaseObject;

    this._productsRef = firebase.database().ref('products');
    this._products = $firebaseArray(this._productsRef);

    this._locationsRef = firebase.database().ref('locations');
    this._locations = $firebaseArray(this._locationsRef);

    this._labelsRef = firebase.database().ref('labels');
    this._labels = $firebaseArray(this._labelsRef);

  }

  addProduct(name, description, locations) {
    return this._products.$add({
      displayName: name,
      description: description || null,
      locations: locations || null
    })
  }

  addLocation(name, description, labels) {
    return this._locations.$add({
      displayName: name,
      description: description || null,
      labels: labels || null
    })
  }

  addLabel(name, description) {
    return this._labels.$add({
      displayName: name,
      description: description || null
    })
  }

  getProduct(id) {
    return this._$firebaseObject(this._productsRef.child(id))
  }

  getLocation(id) {
    return this._$firebaseObject(this._locationsRef.child(id))
  }

  getLabel(id) {
    return this._$firebaseObject(this._labelsRef.child(id))
  }

}