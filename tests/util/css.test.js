const { cssProperty, cssProperties, cssvar } = require('../../dist')

describe('cssProperty', () => {
  it('returns the exepected value', () => {
    expect(cssProperty('k', 'v')).toBe('--k: v;')
    expect(cssProperty('k.b', 'v')).toBe('--k-b: v;')
  })
})

describe('cssProperties', () => {
  it('returns the exepected value', () => {
    expect(cssProperties({ k: 'v' }, 'foo')).toBe('--foo-k: v;')
    expect(cssProperties({ k: 'v', k2: 'v2' }, 'foo')).toBe(
      '--foo-k: v;\n--foo-k2: v2;'
    )
  })
})

describe('cssvar', () => {
  it('returns the expected value', () => {
    expect(cssvar('foo')).toBe('var(--foo)')
    // expect(cssvar('Foo')).toBe('var(--Foo)')
    expect(cssvar('foo-bar')).toBe('var(--foo-bar)')
    expect(cssvar('foo.bar')).toBe('var(--foo-bar)')
    expect(cssvar('foo', 'bar')).toBe('var(--foo, bar)')
  })
})
