// Atomic

export const color = {
  control: 'select',
  options: ['danger', 'neutral', 'primary', 'success'],
}

export const family = {
  control: 'select',
  options: ['mono', 'sans', 'serif'],
}

export const letterSpacing = {
  control: 'select',
  options: ['tigter', 'tight', 'normal', 'wide', 'wider', 'widest'],
}

export const lineHeight = {
  control: 'select',
  options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
}

export const radius = {
  control: 'select',
  options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
}

export const shade = {
  control: {
    type: 'range',
    min: 0,
    max: 9,
    step: 1,
  },
}

export const shadow = {
  control: 'select',
  options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
}

export const transform = {
  control: 'select',
  options: [
    'none',
    'capitalize',
    'uppercase',
    'lowercase',
    'full-width',
    'full-size-kana',
  ],
}

export const typeSize = {
  control: 'select',
  options: ['xs', 'sm', 'normal', 'lg', 'xl', '2xl', '3xl', '4xl'],
}

export const spacing = {
  control: 'select',
  options: [
    '-0.5',
    '-1',
    '-1.5',
    '-2',
    '-2.5',
    '-3',
    '-3.5',
    '-4',
    '-5',
    '-6',
    '-7',
    '-8',
    '-9',
    '-10',
    '-11',
    '-12',
    '-14',
    '-16',
    '-20',
    '-24',
    '-28',
    '-32',
    '-36',
    '-40',
    '-44',
    '-48',
    '-52',
    '-56',
    '-60',
    '-64',
    '-72',
    '-80',
    '-96',
    '0',
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '20',
    '24',
    '28',
    '32',
    '36',
    '40',
    '44',
    '48',
    '52',
    '56',
    '60',
    '64',
    '72',
    '80',
    '96',
  ],
}

export const weight = {
  control: 'select',
  options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold'],
}

// General

export const blur = {
  control: {
    type: 'range',
    min: 0,
    max: 50,
    step: 1,
  },
}

export const hue = {
  control: {
    type: 'range',
    min: 0,
    max: 360,
    step: 1,
  },
}

export const opaque = {
  control: {
    type: 'range',
    min: 0,
    max: 1,
    step: 0.01,
  },
}

export const outline = {
  control: 'boolean',
}

export const saturate = {
  control: {
    type: 'range',
    min: 0,
    max: 300,
    step: 5,
  },
}

export const sepia = {
  control: {
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
  },
}
