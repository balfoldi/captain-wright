class CreateLawyers < ActiveRecord::Migration[6.1]
  def change
    create_table :lawyers do |t|
      t.string :full_name
      t.integer :speechcraft
      t.integer :credibility
      t.integer :avatar, deflault: 0

      t.timestamps
    end
  end
end
