class CreateLawyers < ActiveRecord::Migration[6.1]
  def change
    create_table :lawyers do |t|
      t.string :full_name
      t.integer :speechcraft
      t.integer :credibility

      t.timestamps
    end
  end
end
