export class Title {
  constructor(value) {
    if (typeof value !== 'string' || value.trim().length < 1) {
      throw new Error('Title must be a non-empty string.');
    }

    if (value.length > 120) {
      throw new Error('Title must be 120 characters or fewer.');
    }

    this.value = value.trim();
    Object.freeze(this);
  }
}
