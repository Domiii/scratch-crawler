// https://www.npmjs.com/package/flat#flatten-original-options
import flatten from 'flat';

import { DataTypes } from 'sequelize';

export default function ScratchProject(sequelize) {
  const model = sequelize.define('scratchProject', {
    id: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    image: DataTypes.TEXT,
    'author.id': DataTypes.INTEGER,
    'author.username': DataTypes.TEXT,
    'history.created': DataTypes.DATE,
    'history.modified': DataTypes.DATE,
    'history.shared': DataTypes.DATE,
    'stats.views': DataTypes.INTEGER,
    'stats.loves': DataTypes.INTEGER,
    'stats.favorites': DataTypes.INTEGER,
    'stats.comments': DataTypes.TEXT, // (seems always to be 0)
    'remix.root': DataTypes.TEXT  // (seems always to be null)
  });

  model.prototype.insertProject(projectData, code) {
    const flatProjectData = flatten(projectData);

    // TODO: Insert code
    // TODO: Extract + Insert code summary
    // TODO: Extract + Insert code block summary (one column per block)

    return this.create(flatProjectData);
  }

  return model;
}